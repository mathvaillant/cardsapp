import { ICollection } from "@internal/shared"
import mongoose from "mongoose"
import CollectionPusherEvents from "../events/Collection"
import Card from "./Card"
import User from "./User"

const collectionSchema = new mongoose.Schema<ICollection>(
  {
    name: {
      type: String,
      required: true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
)

collectionSchema.post("save", async function (newCollection: ICollection) {
  await User.findByIdAndUpdate(
    newCollection.createdBy,
    { $push: { collections: newCollection._id } },
    { upsert: true, new: true }
  )

  CollectionPusherEvents.collection_added(newCollection)
})

collectionSchema.post(
  "findOneAndUpdate",
  async function (updatedCollection: ICollection) {
    CollectionPusherEvents.collection_updated(updatedCollection)
  }
)

collectionSchema.post(
  "remove",
  async function (deletedCollection: ICollection) {
    await User.findByIdAndUpdate(deletedCollection.createdBy, {
      $pull: { collections: deletedCollection._id }
    })

    const cardsIds = await Card.find({
      collectionId: deletedCollection._id
    }).then((cards) => cards.map((card) => card._id))

    await Card.updateMany(
      { collectionId: deletedCollection._id },
      {
        $set: { collectionId: null }
      }
    )

    CollectionPusherEvents.collection_deleted(deletedCollection, cardsIds)
  }
)

const Collection = mongoose.model<ICollection>("Collection", collectionSchema)

export default Collection
