const AppError = require('../utils/AppError');
const Card = require('../models/cardModel');

exports.cardRouteRestrictTo = (...args) => async (req, res, next) => {
  try {
    const requestPerformerIsCardOwner = await Card.findOne({
      $and: [
        { _id: req.params.id },
        { createdBy: req.user._id }
      ]
    });

    if(req.user.role !== 'admin' && args.includes('requestPerformer') && Boolean(requestPerformerIsCardOwner)) {
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