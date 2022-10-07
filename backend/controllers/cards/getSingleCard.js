const Card = require('../../models/cardModel');

exports.getSingleCard = async (req, res, next) => {
  try {
    const card = await Card.findOne({ _id: req.params.id });

    res.status(200).json({
      status: 'success',
      data: { card }
    })
  } catch (error) {
    next(error);
  }
};