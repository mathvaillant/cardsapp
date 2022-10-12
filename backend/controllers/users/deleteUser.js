const User = require('../../models/userModel');
const CardCollection = require('../../models/cardCollectionModel');
const Card = require('../../models/cardModel');
const PusherInit = require('../../pusher');
const { CHANNEL_NAME } = require('./constants');

exports.deleteUser = async (req, res, next) => {
  try {
    const userDeleted = await User.findByIdAndDelete(req.params.id);
    
    await Card.deleteMany({
      createdBy: { $eq: userDeleted._id }
    });

    await CardCollection.deleteMany({
      createdBy: { $eq: userDeleted._id }
    });

    PusherInit.trigger(CHANNEL_NAME, 'child_deleted', {
      message: 'User deleted',
      userId: userDeleted._id,  
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