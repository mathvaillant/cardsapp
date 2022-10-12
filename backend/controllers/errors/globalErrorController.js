const AppError = require('../../utils/AppError');

const handleCreateCastErrorDB = (err, res) => {
  const message = `Invalid ${err.path}: ${err.value}.`
  return new AppError(message, 400);
}

const handleDuplicateFieldsDB = (err, res) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/);
  const message = `${value[0]} already in use!`;
  return new AppError(message, 400);
}

const handleValidationErrorDB = (err, res) => {
  const errors = Object.values(err.errors).map(err => err.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
}

const sendError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

exports.globalErrorController = ((err, req, res, next) => {
  err.statusCode = err.statusCode || 500; 
  err.status = err.status || 'error';

  let error = Object.assign(err);

  if(error.name === 'CastError') error = handleCreateCastErrorDB(error)

  if(error.code === 11000) error = handleDuplicateFieldsDB(error)

  if(error.name === 'ValidationError') error = handleValidationErrorDB(error)

  sendError(error, res); 
});