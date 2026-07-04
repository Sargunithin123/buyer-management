CREATE DATABASE Recordent;

USE Recordent;

CREATE TABLE users (

    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100),

    email VARCHAR(100) UNIQUE,

    mobile VARCHAR(15) UNIQUE,

    password VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE buyers (

    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT,

    name VARCHAR(100),

    email VARCHAR(100),

    mobile VARCHAR(15),

    address TEXT,

    total_invoice_amount DECIMAL(10,2),

    total_amount_paid DECIMAL(10,2),

    total_amount_due DECIMAL(10,2),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id)

);
