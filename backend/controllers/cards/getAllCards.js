const Card = require('../../models/cardModel');
const APIQuery = require("../../utils/APIQuery");

exports.getAllCards = async (req, res, next) => {
  try {
    let cards = [];

    if(req.user.role === 'admin') {
      const mongooseQuery = Card.find();
      cards = new APIQuery(mongooseQuery, req.query).paginate();
    } else {
      const mongooseQuery = Card.find({ createdBy: req.user._id });
      cards = new APIQuery(mongooseQuery, req.query).paginate();
    }

    const cardsResult = await cards.mongooseQuery;

    res.status(200).json({
      status: 'success',
      message: 'Cards successfully retrieved',
      results: cardsResult.length, 
      data: cardsResult
    })
  } catch (error) {
    next(error);
  }
};