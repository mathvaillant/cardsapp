const Card = require('../../models/cardModel');

exports.setCardCollectionId = async (req, res, next) => {
  try {
    const { collectionId } = req.body;

    const card = await Card.findByIdAndUpdate(req.params.id, { collectionId }, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: { card }
    })
  } catch (error) {
    next(error);
  }
};