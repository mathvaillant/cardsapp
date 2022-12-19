import { ICollection } from "@internal/shared";
import { NextFunction, Request, Response } from "express";
import Collection from "../../models/Collection";

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const collection = await Collection.findOne({ _id: req.params.id });

    res.status(200).json({
      status: 'success',
      data: collection
    })
  } catch (error) {
    next(error);
  }
};
