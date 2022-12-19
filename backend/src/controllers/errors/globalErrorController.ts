import { NextFunction, Response } from "express";
import AppError from '../../utils/AppError';

type IError = Error & AppError & {
  path: string;
  value: string;
  errmsg: string;
  errors: Record<string, 'message'>[]
};

const handleCreateCastErrorDB = (err: IError) => {
  const message = `Invalid ${err.path}: ${err.value}.`
  return new AppError(message, 400);
}

const handleDuplicateFieldsDB = (err: IError) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/) || 'value';
  const message = `${value[0]} already in use!`;
  return new AppError(message, 400);
}

const handleValidationErrorDB = (err: IError) => {
  const errors = Object.values(err.errors).map((err) => err.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
}

const sendError = (err: IError, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

export const globalErrorController = ((
  err: any, 
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500; 
  err.status = err.status || 'error';

  let error = Object.assign(err);

  if(error.name === 'CastError') error = handleCreateCastErrorDB(error)

  if(error.code === 11000) error = handleDuplicateFieldsDB(error)

  if(error.name === 'ValidationError') error = handleValidationErrorDB(error)

  sendError(error, res); 
});
