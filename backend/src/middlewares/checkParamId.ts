import { NextFunction, Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import AppError from "../utils/AppError";

type IdType = "User" | "Card" | "Collection";

export const checkParamId =
  (idType: IdType) => (req: Request, res: Response, next: NextFunction) => {
    const paramId = req.params.id;

    if (!isValidObjectId(paramId)) {
      throw new AppError(`${idType} not found!`, 404);
    }

    next();
  };
