const User = require('../models/userModel');
const AppError = require('../utils/AppError');
const jwt = require('jsonwebtoken');

const verifyToken = token => new Promise((resolve) => {
  const data = jwt.verify(token, process.env.JWT_SECRET);
  resolve(data);
});

exports.protect = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    let token = null;

    if(authorization && authorization.startsWith('Bearer')) {
      token = authorization.split(' ')[1];
    }

    if(!token) {
      throw new AppError('You are not logged in', 401);
    }

    const decoded = await verifyToken(token)

    const currentUser = await User.findById(decoded.id);

    if(!currentUser) {
      throw new AppError('The user belonging to the token does not exist', 401);
    }

    req.user = currentUser; // attach user data to req
    next();
  } catch (error) {
    next(error);
  }
};