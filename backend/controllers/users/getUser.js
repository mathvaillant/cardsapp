const User = require('../../models/userModel');

exports.getUser = async(req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user.id });

    res.status(200).json({
      status: 'success',
      data: { user }
    });
  } catch (error) {
    next(error);
  }
};