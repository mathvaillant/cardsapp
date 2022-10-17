const Card = require('../../models/cardModel');

exports.updateCard = async (req, res, next) => {
  try {
    const { name, value, description, collectionId } = req.body;

    const card = await Card.findOneAndUpdate({ _id: req.params.id }, {
      name,
      value: value || 0,
      description,
      collectionId,
    },{
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      message: 'Card successfully updated!',
      data: card
    })
  } catch (error) {
    next(error);
  }
};