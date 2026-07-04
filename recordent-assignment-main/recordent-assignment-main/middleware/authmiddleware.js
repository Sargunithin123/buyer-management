const jwt = require('jsonwebtoken');


const authMiddleware = (req, res, next) => {

    try{

        const header = req.headers.authorization;
        
        if(!header){
            return res.send({
                message: 'Access denied. No token provided'
            });
        }

        const token = header.split(" ")[1];
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        req.user = decoded;
        next();
    }

    catch(error){
        return res.send({
            message: 'Invalid token'
        });
    }
};

module.exports = authMiddleware;
