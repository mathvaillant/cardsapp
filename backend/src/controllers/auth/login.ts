import { NextFunction, Request, Response } from "express";
import User from '../../models/User';
import AppError from '../../utils/AppError';
import { createSendToken } from "../../utils/createSendToken";

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;

    if(!username || !password) {
      throw new AppError('Please provide username and password', 400);
    }

    const user = await User.findOne({ username }).select('+password');

    if(!user) {
      throw new AppError('User not found', 400);
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password, user.password);

    if(!isPasswordCorrect) {
      throw new AppError('Incorrect username or password', 400);
    }

    createSendToken(user, 200, res); 
  } catch (error) {
    next(error);
  }
};
