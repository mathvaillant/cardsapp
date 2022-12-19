import { NextFunction, Request, Response } from "express";
import Card from '../../models/Card';

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const card = await Card.findOne({ _id: req.params.id });

    res.status(200).json({
      status: 'success',
      data: card
    })
  } catch (error) {
    next(error);
  }
};
