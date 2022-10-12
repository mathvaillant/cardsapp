const CardCollection = require('../../models/cardCollectionModel');

exports.getAllCollections = async (req, res, next) => {
  try {
    let collections = [];

    if(req.user.role === 'admin') {
      collections = await CardCollection.find();
    } else {
      collections = await CardCollection.find({ createdBy: req.user._id });
    }

    res.status(200).json({
      status: 'success',
      message: 'Collections successfully retrieved',
      results: collections.length,
      data: collections
    })
  } catch (error) {
    next(error);
  }
};