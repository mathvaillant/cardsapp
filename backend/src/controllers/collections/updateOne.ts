import { ICollection } from "@internal/shared";
import { NextFunction, Request, Response } from "express";
import Collection from "../../models/Collection";

export const updateOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;

    const collection = await Collection.findOneAndUpdate({ _id: req.params.id }, { name } , { 
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      message: 'Collection updated successfully!',
      data: collection
    })
  } catch (error) {
    next(error);
  }
};
