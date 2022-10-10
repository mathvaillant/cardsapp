const Card = require('../../models/cardModel');
const User = require('../../models/userModel');
const PusherInit = require('../../pusher');
const { CHANNEL_NAME } = require('./constants');

exports.deleteCard = async (req, res, next) => {
  try {
    const deletedCard = await Card.findByIdAndDelete(req.params.id);

    await User.findByIdAndUpdate(deletedCard.createdBy, {
      $pull: { cards: deletedCard._id }
    });

    PusherInit.trigger(CHANNEL_NAME, 'child_deleted', {
      message: 'Card Deleted',  
    });

    res.status(204).json({
      status: 'success',
      message: 'Card successfully deleted!',
      data: {}
    })
  } catch (error) {
    next(error);
  }
};