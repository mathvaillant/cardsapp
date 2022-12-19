import { NextFunction, Request, Response } from "express"
import Card from "../../models/Card"

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const isAdmin = req.user.role === "admin"
    const page = Math.abs(Number(req.query.page) || 0) || 1
    const limit = Math.abs(Number(req.query.limit) || 0) || 10
    const searchValue =
      req?.query?.searchValue?.toString().trim() !== ""
        ? req.query.searchValue
        : null

    const options = {
      ...(!isAdmin && { createdBy: req.user._id }),
      ...(searchValue && { name: { $regex: searchValue, $options: "i" } })
    }

    const Cards = await Card.find(options)
      .limit(limit)
      .skip((page - 1) * limit)
      .exec()

    const totalDocs = await Card.find(options).count()
    const totalPages = Math.ceil(totalDocs / limit)
    const totalOnPage = Cards.length

    return res.status(200).json({
      status: "success",
      message: "Cards successfully retrieved",
      totalDocs,
      totalPages,
      totalOnPage,
      data: Cards
    })
  } catch (error) {
    next(error)
  }
}
