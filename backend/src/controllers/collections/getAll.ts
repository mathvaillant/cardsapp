import { ICollection } from "@internal/shared";
import { NextFunction, Request, Response } from "express";
import Collection from "../../models/Collection";

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const isAdmin = req.user.role === 'admin';
    const page = Math.abs(Number(req.query.page) || 0) || 1;
    const limit = Math.abs(Number(req.query.limit) || 0) || 10;
    const searchValue = req?.query?.searchValue?.toString().trim() !== '' ? req.query.searchValue : null;

    const options = {
      ...(!isAdmin && { createdBy: req.user._id }),
      ...(searchValue && { name: { $regex: searchValue, $options : 'i' },
      })
    }

    const Collections = await Collection 
      .find(options)
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();

    const totalDocs = await Collection.find(options).count();
    const totalPages = Math.ceil(totalDocs / limit);
    const totalOnPage = Collections.length;

    res.status(200).json({
      status: 'success',
      message: 'Collections successfully retrieved',
      totalDocs,
      totalPages,
      totalOnPage,
      data: Collections
    });
  } catch (error) {
    next(error);
  }
};
