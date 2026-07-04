const mysql = require("mysql2");

const pool = mysql.createPool({

    host: process.env.DB_HOST,

    user: process.env.DB_USER,

    password: process.env.DB_PASSWORD,

    database: process.env.DB_NAME,

    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,

    waitForConnections: true,

    connectionLimit: 10,

    queueLimit: 0,

    connectTimeout: 10000

});

pool.getConnection((err, connection) => {

    if (err) {

        console.log("Database connection failed:", err.message);

    } else {
        console.log("Database:", process.env.DB_NAME);
    
        console.log("Connected to Database");
        pool.query("SELECT DATABASE() AS db", (err, result) => {
            console.log("Current DB:", result);
        });

        connection.release();

    }

});

module.exports = pool;
