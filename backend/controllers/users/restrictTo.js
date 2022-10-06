const AppError = require('../../utils/AppError');

exports.restrictTo = (...args) => async (req, res, next) => {
  try {
    if(!args.includes(req.user.role)) {
      throw new AppError('You do not have permision to perform this action', 403);
    }

    next();
  } catch (error) {
    next(error);
  }
};