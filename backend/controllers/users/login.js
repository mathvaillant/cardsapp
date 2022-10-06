const User = require('../../models/userModel');
const AppError = require('../../utils/AppError');
const { createSendToken } = require("../../utils/createSendToken");

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if(!username || !password) {
      throw new AppError('Please provide username and password', 400);
    }

    const user = await User.findOne({ username }).select('+password');

    if(!user || !(await user.isPasswordCorrect(password, user.password))) {
      throw new AppError('Incorrect username or password', 400);
    }

    createSendToken(user, 200, res); 
  } catch (error) {
    next(error);
  }
};