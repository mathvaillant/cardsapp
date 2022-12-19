import { ICard } from "@internal/shared";
import { NextFunction, Request, Response } from "express";
import Card from '../../models/Card';

export const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    Card.findOneAndRemove({ _id: req.params.id }, function(err: any, card: ICard) {
      card.remove(); // Call remove in order to fire the model hook
    });

    res.status(204).json({
      status: 'success',
      message: 'Card successfully deleted!',
      data: {}
    })
  } catch (error) {
    next(error);
  }
};
