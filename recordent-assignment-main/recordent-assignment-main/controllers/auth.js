const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MOBILE_REGEX = /^[0-9]{10}$/; // adjust if you need a different format

const register = async (req, res) => {
    try {
        let { name, mobile, email, password } = req.body;

        if (!name || !email || !mobile || !password) {
            return res.status(400).send({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        name = String(name).trim();
        email = String(email).trim().toLowerCase();
        mobile = String(mobile).trim();

        if (!EMAIL_REGEX.test(email)) {
            return res.status(400).send({ success: false, message: 'Invalid email format' });
        }
        if (!MOBILE_REGEX.test(mobile)) {
            return res.status(400).send({ success: false, message: 'Invalid mobile number format' });
        }
        if (password.length < 6) {
            return res.status(400).send({ success: false, message: 'Password must be at least 6 characters' });
        }

        db.query(
            'SELECT id, email, mobile FROM users WHERE email = ? OR mobile = ?',
            [email, mobile],
            async (err, results) => {
                if (err) {
                    console.log('Error fetching user:', err);
                    return res.status(500).send({ success: false, message: 'Internal server error' });
                }

                if (results.length > 0) {
                    const emailTaken = results.some(u => u.email === email);
                    const mobileTaken = results.some(u => u.mobile === mobile);
                    let message = 'User already exists';
                    if (emailTaken && !mobileTaken) message = 'Email already registered';
                    if (mobileTaken && !emailTaken) message = 'Mobile number already registered';

                    return res.status(409).send({ success: false, message });
                }

                let hashedPassword;
                try {
                    hashedPassword = await bcrypt.hash(password, 10);
                } catch (hashErr) {
                    console.log('Error hashing password:', hashErr);
                    return res.status(500).send({ success: false, message: 'Internal server error' });
                }

                db.query(
                    'INSERT INTO users (name, email, mobile, password) VALUES (?, ?, ?, ?)',
                    [name, email, mobile, hashedPassword],
                    (insertErr, result) => {
                        if (insertErr) {
                            console.log('Error inserting user:', insertErr);
                            return res.status(500).send({
                                success: false,
                                message: 'Error registering user'
                            });
                        }

                        return res.status(201).send({
                            success: true,
                            message: 'User registered successfully'
                        });
                    }
                );
            }
        );
    } catch (error) {
        console.log('Error during registration:', error);
        return res.status(500).send({ success: false, message: 'Internal server error' });
    }
};

const login = async (req, res) => {
    try {
        let { emailorMobile, password } = req.body;

        if (!emailorMobile || !password) {
            return res.status(400).send({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        emailorMobile = String(emailorMobile).trim().toLowerCase();

        if (!process.env.JWT_SECRET) {
            console.log('JWT_SECRET is not set in environment variables');
            return res.status(500).send({ success: false, message: 'Internal server error' });
        }

        db.query(
            'SELECT * FROM users WHERE email = ? OR mobile = ?',
            [emailorMobile, emailorMobile],
            async (err, results) => {
                if (err) {
                    console.log('Error fetching user:', err);
                    return res.status(500).send({ success: false, message: 'Internal server error' });
                }

                if (results.length === 0) {
                    return res.status(404).send({ success: false, message: 'User not found' });
                }

                const user = results[0];

                let isPasswordValid;
                try {
                    isPasswordValid = await bcrypt.compare(password, user.password);
                } catch (compareErr) {
                    console.log('Error comparing password:', compareErr);
                    return res.status(500).send({ success: false, message: 'Internal server error' });
                }

                if (!isPasswordValid) {
                    return res.status(401).send({ success: false, message: 'Incorrect password' });
                }

                const token = jwt.sign(
                    { id: user.id },
                    process.env.JWT_SECRET,
                    { expiresIn: '10m' }
                );

                return res.status(200).json({
                    success: true,
                    token,
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        mobile: user.mobile
                    }
                });
            }
        );
    } catch (error) {
        console.log('Error during login:', error);
        return res.status(500).send({ success: false, message: 'Internal server error' });
    }
};

const logout = (req, res) => {
    return res.status(200).send({ success: true, message: 'Logout successful' });
};

module.exports = {
    register,
    login,
    logout
};