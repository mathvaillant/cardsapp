const Card = require('../../models/cardModel');

exports.deleteCard = async (req, res, next) => {
  try {
    Card.findOneAndRemove({ _id: req.params.id }, function(err, card) {
      card.remove(); // Call remove in order to fire the model hook
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