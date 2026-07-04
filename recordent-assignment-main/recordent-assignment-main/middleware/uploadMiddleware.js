const multer = require('multer');


// storage settings

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, 'uploads/');

    },

    filename: (req, file, cb) => {

        cb(null, Date.now() + "-" + file.originalname);

    }

});


// file filter (only csv and excel)

const fileFilter = (req, file, cb) => {

    if(

        file.mimetype === 'text/csv' ||

        file.mimetype === 'application/vnd.ms-excel' ||

        file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'

    ){

        cb(null, true);

    }
    else{

        cb(new Error('Only CSV or Excel allowed'), false);

    }

};


const upload = multer({

    storage: storage,

    fileFilter: fileFilter,

    limits: { fileSize: 5 * 1024 * 1024 }

});


module.exports = upload;
