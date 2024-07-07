const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../model/UserMode');

const Protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      console.error('Error with authentication middleware:', error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});


const AdminProtect = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403);
    throw new Error('Not authorized as an admin');
  }
});

const teamManager = (req, res, next) => {
  if (req.user && req.user.role === 'teamManager') {
    next();
  } else {
    res.status(403);
    throw new Error('Not authorized as team manager');
  }
};

module.exports = { Protect, AdminProtect, teamManager };
