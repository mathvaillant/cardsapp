import { NextFunction, Request, Response } from "express";
import User from '../../models/User';
import AppError from '../../utils/AppError';
import { createSendToken } from "../../utils/createSendToken";

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, name, password } = req.body;

    if(!username || !name || !password) {
      throw new AppError('Please fill in all the info required', 400);
    }

    const userExists = await User.findOne({ username: username });

    if(userExists) {
      throw new AppError('A user with the given credentials already exists', 400);
    }

    const newUser = await User.create({ name, username, password });

    createSendToken(newUser, 201, res);
  } catch (error) {
    next(error);
  }
};
