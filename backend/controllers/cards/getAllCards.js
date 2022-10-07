const Card = require('../../models/cardModel');

exports.getAllCards = async (req, res, next) => {
  try {
    const cards = await Card.find({ createdBy: req.user._id });

    res.status(200).json({
      status: 'success',
      results: cards.length,
      data: { cards }
    })
  } catch (error) {
    next(error);
  }
};