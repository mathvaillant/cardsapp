const User = require('../../models/userModel');
const PusherInit = require('../../pusher');
const { CHANNEL_NAME } = require('./constants');

exports.updateUser = async (req, res, next) => {
  try {
    const userUpdated = await User.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      username: req.body.username,
      role: req.body.role,
    },{
      new: true,
      runValidators: true,
    });

    PusherInit.trigger(CHANNEL_NAME, 'child_updated', {
      message: 'User updated',
      userId: userUpdated._id,  
    });

    const isSelfUpdating = req.user._id.toString() === userUpdated._id.toString();

    res.status(200).json({
      status: 'success',
      message: isSelfUpdating ? 'Profile updated!' : 'User updated successfully!',
      data: userUpdated
    });
  } catch (error) {
   next(error); 
  }
};
