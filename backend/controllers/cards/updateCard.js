const Card = require('../../models/cardModel');

exports.updateCard = async (req, res, next) => {
  try {
    const { name, value, description, collectionId } = req.body;

    const card = await Card.findByIdAndUpdate(req.params.id, {
      name,
      value,
      description,
      collectionId,
    },{
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