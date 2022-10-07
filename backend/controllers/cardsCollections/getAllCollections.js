const CardCollection = require('../../models/cardCollectionModel');

exports.getAllCollections = async (req, res, next) => {
  try {
    const collections = await CardCollection.find({ createdBy: req.user._id });

    res.status(200).json({
      status: 'success',
      results: collections.length,
      data: { collections }
    })
  } catch (error) {
    next(error);
  }
};