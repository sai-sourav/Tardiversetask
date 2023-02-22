const JWT = require('jsonwebtoken');
const User = require('../models/user');

exports.authenticate = async (req,res,next) => {
    const token = req.header('Authorization');
    try{
        const result = JWT.verify(token, process.env.TOKEN_SECRET);
        const email = result.email;
        req.user = await User.findOne({email: email});
        next();
    }catch(err){
        if(err){
            res.status(401).json({
                error : err
            })
        }
    }
}

