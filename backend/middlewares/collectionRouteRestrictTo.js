const AppError = require('../utils/AppError');
const CardCollection = require('../models/cardCollectionModel');

exports.collectionRouteRestrictTo = (...args) => async (req, res, next) => {
  try {
    const requestPerformerIsCollectionOwner = await CardCollection.findOne({
      $and: [
        { _id: req.params.id },
        { createdBy: req.user._id }
      ]
    });

    if(req.user.role !== 'admin' && args.includes('requestPerformer') && Boolean(requestPerformerIsCollectionOwner)) {
      return next();
    }

    if(!args.includes(req.user.role)) {
      throw new AppError('You do not have permision to perform this action', 403);
    }

    next();
  } catch (error) {
    next(error);
  }
};