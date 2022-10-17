const ObjectId = require('mongoose').Types.ObjectId;
const Card = require('../../models/cardModel');

exports.getCardsByCollection = async (req, res, next) => {
  try {
    const cards = await Card.find({ collectionId: ObjectId(req.query.collectionId) });

    res.status(200).json({
      status: 'success',
      message: 'Successfully retrieved cards by collection',
      data: cards
    })
  } catch (error) {
    next(error);
  }
};