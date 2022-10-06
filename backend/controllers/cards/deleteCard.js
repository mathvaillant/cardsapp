const Card = require('../../models/cardModel');

exports.deleteCard = async (req, res, next) => {
  try {
    await Card.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: {}
    })
  } catch (error) {
    next(error);
  }
};