const express = require('express');

const router = express.Router();

const upload = require('../middleware/uploadMiddleware');

const authMiddleware = require('../middleware/authmiddleware');

const buyerController = require('../controllers/buyerController');


// upload route (protected)

router.post(

'/upload',

authMiddleware,

upload.single('file'),

buyerController.uploadFile

);


// view buyers route (protected)

router.get(

'/view',

authMiddleware,

buyerController.viewBuyers

);


module.exports = router;
