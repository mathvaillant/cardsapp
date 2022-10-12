const User = require('../../models/userModel');

exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      username: req.body.username,
      role: req.body.role,
    },{
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      message: 'User updated successfully!',
      data: user
    });
  } catch (error) {
   next(error); 
  }
};
