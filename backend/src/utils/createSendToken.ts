import { IUser } from "@internal/shared";
import { Response } from "express";
import { signToken } from "./signToken";

export const createSendToken = (user: IUser, statusCode: number, res: Response) => {
  const token = signToken(user.id);

  const userData = {
    token,
    _id: user.id,
    name: user.name,
    username: user.username,
    role: user.role,
    cards: user.cards,
    collections: user.collections,
  }
  
  return res.status(statusCode).json({
    status: 'success',
    message: 'Successfully signed in',
    data: userData,
  });
};
