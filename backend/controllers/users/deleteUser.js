const User = require('../../models/userModel');

exports.deleteUser = async (req, res, next) => {
  try {
    User.findOneAndRemove({ _id: req.params.id }, function(err, user) {
      user.remove(); // Call remove in order to fire the model hook
    });

    res.status(204).json({
      status: 'success',
      message: 'User successfully deleted!',
      data: {}
    });

  } catch (error) {
    next(error);
  }
};