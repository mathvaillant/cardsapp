import mongoose from "mongoose"
import { getCardColors } from "../utils/getCardColors"
import { ICard } from "@internal/shared"
import User from "./User"
import CardPusherEvents from "../events/Card"

const cardSchema = new mongoose.Schema<ICard>(
  {
    name: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    collectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collection",
      default: null
    },
    colors: {
      type: [String],
      default: getCardColors()
    }
  },
  {
    timestamps: true
  }
)

cardSchema.post("save", async function (newCard: ICard) {
  await User.findByIdAndUpdate(newCard.createdBy, {
    $push: { cards: newCard._id }
  })

  CardPusherEvents.card_added(newCard)
})

cardSchema.post("findOneAndUpdate", async function (updatedCard) {
  CardPusherEvents.card_updated(updatedCard)
})

cardSchema.post("remove", async function (deletedCard: ICard) {
  await User.findByIdAndUpdate(deletedCard.createdBy, {
    $pull: { cards: deletedCard._id }
  })

  CardPusherEvents.card_deleted(deletedCard)
})

const Card = mongoose.model<ICard>("Card", cardSchema)

export default Card
