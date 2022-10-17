const CardCollection = require('../../models/cardCollectionModel');

exports.getSingleCollection = async (req, res, next) => {
  try {
    const collection = await CardCollection.findOne({ _id: req.params.id });

    res.status(200).json({
      status: 'success',
      data: collection
    })
  } catch (error) {
    next(error);
  }
};