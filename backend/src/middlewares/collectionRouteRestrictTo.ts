import { Request, Response, NextFunction } from 'express';
import Collection from "../models/Collection";
import AppError from "../utils/AppError";

export const collectionRouteRestrictTo = (...args: string[]) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const requestPerformerIsCollectionOwner = await Collection.findOne({
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
