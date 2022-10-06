const User = require('../../models/userModel');

exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, {
      name: req.body.name,
      username: req.body.username,
    },{
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: { user }
    });
  } catch (error) {
   next(error); 
  }
};
