const Card = require('../../models/cardModel');

exports.updateCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      value: req.body.value,
      description: req.body.description,
      collectionId: req.body.collectionId,
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