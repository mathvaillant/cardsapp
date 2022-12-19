import { ICollection } from "@internal/shared";
import { NextFunction, Request, Response } from "express";
import Collection from "../../models/Collection";

export const deleteOne = (req: Request, res: Response, next: NextFunction) => {
  try {
    Collection.findOneAndRemove({ _id: req.params.id }, function(err: any, collection: ICollection) {
      collection.remove(); // Call remove in order to fire the model hook
    });

    res.status(204).json({
      status: 'success',
      message: 'Collection successfully deleted!',
      data: {}
    })
  } catch (error) {
    next(error);
  }
};
