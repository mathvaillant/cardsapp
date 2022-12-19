import { Request, Response, NextFunction } from "express"
import Card from "../models/Card"
import AppError from "../utils/AppError"

export const cardRouteRestrictTo =
  (...args: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const requestPerformerIsCardOwner = await Card.findOne({
        $and: [{ _id: req.params.id }, { createdBy: req.user._id }]
      })

      if (
        req.user.role !== "admin" &&
        args.includes("requestPerformer") &&
        Boolean(requestPerformerIsCardOwner)
      ) {
        return next()
      }

      if (!args.includes(req.user.role)) {
        throw new AppError(
          "You do not have permision to perform this action",
          403
        )
      }

      next()
    } catch (error) {
      next(error)
    }
  }
