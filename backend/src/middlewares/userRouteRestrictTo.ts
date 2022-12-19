import { Request, Response, NextFunction } from 'express';
import AppError from "../utils/AppError";

export const userRouteRestrictTo = (...args: string[]) => async (req: Request, res: Response, next: NextFunction) => {
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
