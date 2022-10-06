const Card = require('../../models/cardModel');

exports.getCard = async (req, res, next) => {
  try {
    const card = await Card.findOne({ id: req.params.id });

    res.status(200).json({
      status: 'success',
      data: { card }
    })
  } catch (error) {
    next(error);
  }
};