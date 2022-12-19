import { NextFunction, Request, Response } from "express";
import Collection from "../../models/Collection";
import AppError from '../../utils/AppError';

export const createOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;

    if(!name) {
      throw new AppError('Please provide a name to the collection!', 400);
    }

    const userCollectionAlreadyExists = await Collection.findOne({
      $and: [
        { name: name },
        { createdBy: req.user._id }
      ]
    });

    if(userCollectionAlreadyExists) {
      throw new AppError('A collection with the same name already exists. Please, provide a unique name!', 400);
    }

    const newCollection = await Collection.create({
      name,
      createdBy: req.user._id,
    });
    
    return res.status(201).json({
      status: 'success',
      message: 'Collection successfully added!',
      data: newCollection
    });

  } catch (error) {
    next(error);
  }
};
