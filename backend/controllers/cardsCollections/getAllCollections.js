const CardCollection = require('../../models/cardCollectionModel');
const APIQuery = require("../../utils/APIQuery");

exports.getAllCollections = async (req, res, next) => {
  try {
    let collections = [];

    if(req.user.role === 'admin') {
      const mongooseQuery = CardCollection.find();
      collections = new APIQuery(mongooseQuery, req.query).filter().paginate();
    } else {
      const mongooseQuery = CardCollection.find({ createdBy: req.user._id });
      collections = new APIQuery(mongooseQuery, req.query).filter().paginate();
    }

    const collectionsResult = await collections.mongooseQuery;  

    res.status(200).json({
      status: 'success',
      message: 'Collections successfully retrieved',
      results: collectionsResult.length,
      data: collectionsResult
    })
  } catch (error) {
    next(error);
  }
};