const CardCollection = require('../../models/cardCollectionModel');

exports.getCollection = async (req, res, next) => {
  try {
    const collection = await CardCollection.findOne({ id: req.params.id });

    res.status(200).json({
      status: 'success',
      data: { collection }
    })
  } catch (error) {
    next(error);
  }
};