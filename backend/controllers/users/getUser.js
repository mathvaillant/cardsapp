const User = require('../../models/userModel');
const AppError = require("../../utils/AppError");

exports.getUser = async(req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id });

    res.status(200).json({
      status: 'success',
      data: { user }
    });
  } catch (error) {
    next(error);
  }
};