const CardCollection = require('../../models/cardCollectionModel');

exports.updateCollection = async (req, res, next) => {
  try {
    const collection = await CardCollection.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      cards: req.body.cards,
    },{
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: { collection }
    })
  } catch (error) {
    next(error);
  }
};