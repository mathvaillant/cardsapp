const User = require('../../models/userModel');

exports.deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    
    res.status(204).json({
      status: 'success',
      data: {}
    });
  } catch (error) {
    next(error);
  }
};