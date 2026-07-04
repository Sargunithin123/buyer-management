const db = require("../config/db");
const csv = require("csv-parser");
const fs = require("fs");

// =======================
// Upload Buyers CSV
// =======================

exports.uploadFile = (req, res) => {

    const userId = req.user.id;

    console.log("UPLOAD USER:", userId);

    if (!req.file) {
        return res.send({
            success: false,
            message: "No file uploaded"
        });
    }

    const buyers = [];

    fs.createReadStream(req.file.path)
        .pipe(csv())
        .on("data", (row) => {
            buyers.push(row);
        })
        .on("end", () => {

            console.log("TOTAL BUYERS:", buyers.length);

            if (buyers.length === 0) {

                fs.unlink(req.file.path, () => {});

                return res.send({
                    success: false,
                    message: "CSV file is empty"
                });
            }

            let inserted = 0;

            buyers.forEach((buyer, index) => {

                db.query(
                    `INSERT INTO buyers
                    (
                        user_id,
                        name,
                        email,
                        mobile,
                        address,
                        total_invoice_amount,
                        total_amount_paid,
                        total_amount_due
                    )
                    VALUES (?,?,?,?,?,?,?,?)`,
                    [
                        userId,
                        buyer.name,
                        buyer.email,
                        buyer.mobile,
                        buyer.address,
                        buyer.total_invoice_amount,
                        buyer.total_amount_paid,
                        buyer.total_amount_due
                    ],
                    (err, result) => {

                        if (err) {

                            console.log("INSERT ERROR:", err);

                        } else {

                            inserted++;

                            console.log(
                                `Inserted Buyer ${inserted}:`,
                                result.insertId
                            );
                        }

                        // After last row processed
                        if (index === buyers.length - 1) {

                            fs.unlink(req.file.path, () => {});

                            return res.send({
                                success: true,
                                message: `${inserted} buyers uploaded successfully`
                            });

                        }

                    }
                );

            });

        })
        .on("error", (err) => {

            console.log("CSV READ ERROR:", err);

            return res.send({
                success: false,
                message: "Error reading CSV file"
            });

        });

};

// =======================
// View Buyers
// =======================

exports.viewBuyers = (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;
    const search = req.query.search || "";

    const userId = req.user.id;

    console.log("Viewing buyers for user:", userId);

    const query = `
        SELECT *
        FROM buyers
        WHERE user_id = ?
        AND (
            name LIKE ?
            OR email LIKE ?
            OR mobile LIKE ?
        )
        ORDER BY id DESC
        LIMIT ?
        OFFSET ?
    `;

    db.query(
        query,
        [
            userId,
            `%${search}%`,
            `%${search}%`,
            `%${search}%`,
            limit,
            offset
        ],
        (err, result) => {

            if (err) {

                console.log("VIEW ERROR:", err);

                return res.send({
                    success: false,
                    data: []
                });

            }

            console.log("TOTAL RECORDS:", result.length);

            return res.send({
                success: true,
                data: result
            });

        }
    );

};