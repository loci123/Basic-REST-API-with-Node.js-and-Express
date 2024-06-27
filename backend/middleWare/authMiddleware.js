const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User=require('../model/UserMode')

const Protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1]; // e.g. Bearer ji2j1o3mjsd-@@#!@noi

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from token
            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not Authorized');
        }
    } else {
        res.status(401);
        throw new Error('Not Authorized, No token');
    }
});

const AdminProtect=asyncHandler(async(req,res,next)=>{
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403);
        throw new Error('Not authorized as an admin');
    }
})

module.exports = { Protect,AdminProtect };
