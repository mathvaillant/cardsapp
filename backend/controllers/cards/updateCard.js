const Card = require('../../models/cardModel');
const PusherInit = require('../../pusher');
const { CHANNEL_NAME } = require('./constants');

exports.updateCard = async (req, res, next) => {
  try {
    const { name, value, description, collectionId } = req.body;

    const card = await Card.findByIdAndUpdate(req.params.id, {
      name,
      value,
      description,
      collectionId,
    },{
      new: true,
      runValidators: true,
    });

    PusherInit.trigger(CHANNEL_NAME, 'child_updated', {
      message: 'Card updated',
      carId: card._id,  
    });

    res.status(200).json({
      status: 'success',
      message: 'Card successfully updated!',
      data: card
    })
  } catch (error) {
    next(error);
  }
};