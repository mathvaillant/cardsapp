import { Types } from "mongoose"
import { NextFunction, Request, Response } from "express"
import Card from "../../models/Card"

export const getByCollection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const collectionId = req.query.collectionId as string
    const cards = await Card.find({
      collectionId: collectionId
    })

    res.status(200).json({
      status: "success",
      message: "Successfully retrieved cards by collection",
      data: cards
    })
  } catch (error) {
    next(error)
  }
}
