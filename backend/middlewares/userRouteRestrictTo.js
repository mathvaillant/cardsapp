const AppError = require('../utils/AppError');

exports.userRouteRestrictTo = (...args) => async (req, res, next) => {
  try {
    if(req.user.role !== 'admin' && args.includes('requestPerformer') && req.user._id.toString() === req.params.id) {
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