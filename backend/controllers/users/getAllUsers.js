const User = require('../../models/userModel');

exports.getAllUsers = async(req, res, next) => {
  try {
    const users = await User.find({ 
      _id: { $ne: req.user._id }
    });

    res.status(200).json({
      status: 'success',
      results: users.length,
      data: users
    });
  } catch (error) {
    next(error);
  }
};