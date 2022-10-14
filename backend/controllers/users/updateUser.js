const User = require('../../models/userModel');

exports.updateUser = async (req, res, next) => {
  try {
    const userUpdated = await User.findOneAndUpdate({ _id: req.params.id }, {
      name: req.body.name,
      username: req.body.username,
      role: req.body.role,
    },{
      new: true,
      runValidators: true,
    });

    const isSelfUpdating = req.user._id.toString() === userUpdated._id.toString();

    res.status(200).json({
      status: 'success',
      message: isSelfUpdating ? 'Profile updated!' : 'User updated successfully!',
      data: {
        _id: userUpdated._id,
        name: userUpdated.name,
        username: userUpdated.username,
        role: userUpdated.role,
        cards: userUpdated.cards,
        collections: userUpdated.collections,
      }
    });
  } catch (error) {
   next(error); 
  }
};
