import { ICard } from "@internal/shared"
import { mapKeyValueEvent } from "../utils/mapKeyValueEvent"
import PusherInit from "../pusher"

const PUSHER_CHANNEL = "cards"

const card_added = (card: ICard) => {
  PusherInit.trigger(PUSHER_CHANNEL, "child_added", {
    reason: "card_added",
    data_changed: {
      cards: mapKeyValueEvent([card._id], "child_added"),
      users: mapKeyValueEvent([card.createdBy.toString()], "child_updated")
    }
  })
}

const card_updated = (card: ICard) => {
  PusherInit.trigger(PUSHER_CHANNEL, "child_updated", {
    reason: "card_updated",
    data_changed: {
      cards: mapKeyValueEvent([card._id], "child_updated")
    }
  })
}

const card_deleted = (card: ICard) => {
  PusherInit.trigger(PUSHER_CHANNEL, "child_deleted", {
    reason: "card_deleted",
    data_changed: {
      cards: mapKeyValueEvent([card._id], "child_deleted"),
      users: mapKeyValueEvent([card.createdBy.toString()], "child_updated")
    }
  })
}

const childs_updated = () => {
  PusherInit.trigger(PUSHER_CHANNEL, "childs_updated", {
    reason: "childs_updated"
  })
}

const CardPusherEvents = {
  card_added,
  card_updated,
  card_deleted,
  childs_updated
}

export default CardPusherEvents
