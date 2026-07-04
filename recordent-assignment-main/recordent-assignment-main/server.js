const express = require('express');

const cors = require('cors');

require('dotenv').config();


// database connection

require('./config/db');


// import routes

const authRoutes = require('./routers/authrouter');

const buyerRoutes = require('./routers/buyerRoutes');


// create app

const app = express();


// middleware

app.use(cors());

app.use(express.json());


// routes

app.use('/api/auth', authRoutes);

app.use('/api/buyer', buyerRoutes);


// test route (optional but recommended)

app.get('/', (req, res) => {

    res.send({

        message: 'Server running successfully'

    });

});


// start server

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});
