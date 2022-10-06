exports.globalErrorController = ((err, req, res, next) => {
  err.statusCode = err.statusCode || 500; 
  err.status = err.status || 'error';
  console.log("🚀 ~ file: globalErrorController.js ~ line 4 ~ err", err)
  
  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
});