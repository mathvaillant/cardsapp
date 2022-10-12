const Card = require('../../models/cardModel');

exports.getAllCards = async (req, res, next) => {
  try {
    let cards = [];

    if(req.user.role === 'admin') {
      cards = await Card.find();
    } else {
      cards = await Card.find({ createdBy: req.user._id });
    }

    res.status(200).json({
      status: 'success',
      message: 'Cards successfully retrieved',
      results: cards.length, 
      data: cards
    })
  } catch (error) {
    next(error);
  }
};