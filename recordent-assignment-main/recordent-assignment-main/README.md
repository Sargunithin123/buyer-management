# Recordent Assignment

## Live Application

Frontend Live URL:  
https://recordent-assignment-2.onrender.com/

Backend Live URL:  
https://recordent-assignment-1.onrender.com


## Demo Video

Watch full working demo here:  
https://drive.google.com/file/d/1mvQPXXaMZ003jm4MQpurGC-gnFt8Garj/view?usp=sharing


## GitHub Repository

https://github.com/maheshbatta938/recordent-assignment


# Project Overview

This is a full-stack web application developed for the Recordent assignment.

The application allows users to:

- Register account
- Login using Email or Mobile
- Upload buyer data via CSV file
- Store buyer data in MySQL database
- View buyer data in table format
- Search buyers
- Pagination support
- Each user can access only their own data


# Technology Stack

## Frontend

- React (Vite)
- Tailwind CSS
- Axios


## Backend

- Node.js
- Express.js
- JWT Authentication
- Multer (File Upload)


## Database

- MySQL


## Deployment

- Render (Frontend and Backend)
- FreeSQLDatabase (Cloud MySQL)


# Features

## Authentication

- User Registration
- User Login
- JWT based authentication
- Protected routes


## Buyer Management

- Upload CSV file
- Store data in database
- View buyers list
- Pagination
- Search functionality


## Security

- Password hashing using bcrypt
- JWT token authentication
- User-specific data access


# Project Structure

Recordent
│
├ config
├ controllers
├ middleware
├ routers
├ uploads
├ recordent-frontend
├ server.js
├ database.sql
├ README.md


# Backend Setup (Local)

Open terminal:

cd Recordent

Install dependencies:

npm install


Create .env file:

PORT=3000
JWT_SECRET=recordentsecret

DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=Recordent


Run backend:

node server.js


Server runs at:

http://localhost:3000


# Frontend Setup (Local)

Open terminal:

cd recordent-frontend

Install dependencies:

npm install

Run frontend:

npm run dev


Frontend runs at:

http://localhost:5173


# Database Setup

Open MySQL Workbench

Run:

database.sql


This creates:

- users table
- buyers table


# How to Use

Step 1  
Register new account  

Step 2  
Login  

Step 3  
Upload CSV file  

Step 4  
View buyers  

Step 5  
Use search and pagination  


# Author

Mahesh Batta


