import { IUser } from "@internal/shared";
import { NextFunction, Request, Response } from "express";
import User from "../../models/User";

export const getOne = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({ _id: req.params.id });

    res.status(200).json({
      status: 'success',
      message: 'User successfully retrieved',
      data: user
    });
  } catch (error) {
    next(error);
  }
};
