import { IUser } from "@internal/shared";
import { NextFunction, Request, Response } from "express";
import User from "../../models/User";
import AppError from "../../utils/AppError";

export const updateOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userUpdated = await User.findOneAndUpdate({ _id: req.params.id }, {
      name: req.body.name,
      username: req.body.username,
      role: req.body.role,
    },{
      new: true,
      runValidators: true,
    });

    if(!userUpdated) {
      throw new AppError('User not found', 404);
    }

    const isSelfUpdating = req.user._id.toString() === userUpdated._id.toString();

    res.status(200).json({
      status: 'success',
      message: isSelfUpdating ? 'Profile updated!' : 'User updated successfully!',
      data: { ...userUpdated }
    });
  } catch (error) {
   next(error); 
  }
};
