import { IUser } from "@internal/shared";
import { NextFunction, Request, Response } from "express";
import User from "../../models/User";

export const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    User.findOneAndRemove({ _id: req.params.id }, function(err: any, user: IUser) {
      user.remove(); // Call remove in order to fire the model hook
    });

    res.status(204).json({
      status: 'success',
      message: 'User successfully deleted!',
      data: {}
    });

  } catch (error) {
    next(error);
  }
};
