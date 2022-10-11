const CardCollection = require('../../models/cardCollectionModel');
const PusherInit = require('../../pusher');
const { CHANNEL_NAME } = require('./constants');

exports.updateCollection = async (req, res, next) => {
  try {
    const { name } = req.body;

    const collection = await CardCollection.findByIdAndUpdate(req.params.id, { name } , { 
      new: true,
      runValidators: true,
    });

    PusherInit.trigger(CHANNEL_NAME, 'child_updated', {
      message: 'Collection updated',
      collectionId: collection._id,  
    });

    res.status(200).json({
      status: 'success',
      message: 'Collection updated successfully!',
      data: collection
    })
  } catch (error) {
    next(error);
  }
};