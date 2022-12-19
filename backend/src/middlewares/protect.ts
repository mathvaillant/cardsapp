import { Request, Response, NextFunction } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { IUser } from "@internal/shared";
import AppError from "../utils/AppError";
import User from "../models/User";

const verifyToken = (token: string): Promise<string | JwtPayload> => new Promise((resolve) => {
  const data = verify(token, process.env.JWT_SECRET || '');
  resolve(data);
});

export async function protect(req: Request, res: Response, next: NextFunction){
  try {
    const { authorization } = req.headers;
    let token = null;

    if(authorization && authorization.startsWith('Bearer')) {
      token = authorization.split(' ')[1];
    }

    if(!token) {
      throw new AppError('You are not logged in', 401);
    }

    const decoded = await verifyToken(token) as JwtPayload;
    const currentUser = await User.findById(decoded.id);

    if(!currentUser) {
      throw new AppError('The user belonging to the token does not exist', 401);
    }

    req.user = currentUser as IUser;
    next();
  } catch (error) {
    next(error);
  }
}
