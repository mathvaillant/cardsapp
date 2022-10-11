const CardCollection = require('../../models/cardCollectionModel');
const User = require('../../models/userModel');
const Card = require('../../models/cardModel');
const PusherInit = require('../../pusher');
const { CHANNEL_NAME } = require('./constants');

exports.deleteCollection = async (req, res, next) => {
  try {
    const deletedCollection = await CardCollection.findByIdAndDelete(req.params.id);

    await User.findByIdAndUpdate(deletedCollection.createdBy, {
      $pull: { collections: deletedCollection._id }
    });

    await Card.updateMany({
      collectionId: deletedCollection._id
    }, {
      $set: { collectionId: null },
    });

    PusherInit.trigger(CHANNEL_NAME, 'child_deleted', {
      message: 'Collection Deleted',  
    });

    res.status(204).json({
      status: 'success',
      message: 'Collection successfully deleted!',
      data: {}
    })
  } catch (error) {
    next(error);
  }
};