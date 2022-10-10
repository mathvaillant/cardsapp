const Card = require('../../models/cardModel');

exports.deleteCard = async (req, res, next) => {
  try {
    // 1 - Delete card
    await Card.findByIdAndDelete(req.params.id);

    // 2 - Delete this card id from the user (createdBy) cards

    res.status(204).json({
      status: 'success',
      data: {}
    })
  } catch (error) {
    next(error);
  }
};