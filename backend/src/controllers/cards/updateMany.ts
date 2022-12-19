import { ICollection } from "@internal/shared"
import { NextFunction, Request, Response } from "express"
import CardPusherEvents from "../../events/Card"
import CollectionPusherEvents from "../../events/Collection"
import Card from "../../models/Card"
import PusherInit from "../../pusher"

export const updateMany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cardsIds, collectionId } = req.body

    await Card.updateMany(
      {
        _id: { $in: cardsIds }
      },
      {
        $set: { collectionId }
      }
    )

    await Card.updateMany(
      {
        $and: [
          {
            _id: { $nin: cardsIds },
            collectionId: { $eq: collectionId }
          }
        ]
      },
      {
        $set: { collectionId: null }
      }
    )

    CardPusherEvents.childs_updated()
    CollectionPusherEvents.collection_updated({
      _id: collectionId
    } as ICollection)

    res.status(200).json({
      status: "success",
      message: "Collection cards successfully updated!",
      data: {}
    })
  } catch (error) {
    next(error)
  }
}
