const Card = require('../../models/cardModel');
const PusherInit = require('../../pusher');
const { CHANNEL_NAME } = require('./constants');

exports.updateMultipleCards = async (req, res, next) => {
  try {
    const { cardsIds, collectionId } = req.body;

    // Updated selected cards
    await Card.updateMany({
      _id: { $in: cardsIds },
    }, {
      $set: { collectionId },
    });

    // Updated unselected cards
    await Card.updateMany({
      $and: [
        {
          _id: { $nin: cardsIds },
          collectionId: { $eq: collectionId }
        },
      ]
    }, {
      $set: { collectionId: null },
    });

    PusherInit.trigger(CHANNEL_NAME, 'childs_updated', {
      message: 'Cards updated',  
    });

    res.status(200).json({
      status: 'success',
      message: 'Collection cards successfully updated!',
      data: {}
    })
  } catch (error) {
    next(error);
  }
};