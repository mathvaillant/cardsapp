import { IUser } from "@internal/shared";
import PusherInit from "../pusher";
import { mapKeyValueEvent } from "../utils/mapKeyValueEvent";

const PUSHER_CHANNEL = 'users';

const user_added = (user: IUser) => {
  PusherInit.trigger(PUSHER_CHANNEL, 'child_added', {
    reason: 'user_added', 
    data_changed: {
      users: mapKeyValueEvent([user._id], 'child_added'), 
    }, 
  });
}

const user_updated = (user: IUser) => {
  PusherInit.trigger(PUSHER_CHANNEL, 'child_updated', {
    reason: 'user_updated', 
    data_changed: {
      users: mapKeyValueEvent([user._id], 'child_updated'), 
    }, 
  });
}

export const user_deleted = (user: IUser, cardsIds: string[], collectionsIds: string[]) => {
  PusherInit.trigger(PUSHER_CHANNEL, 'child_deleted', {
    reason: 'user_deleted',  
    data_changed: {
      users: mapKeyValueEvent([user._id], 'child_deleted'), 
      cards: mapKeyValueEvent(cardsIds, 'child_deleted'), 
      collections: mapKeyValueEvent(collectionsIds, 'child_deleted'), 
    },
  });
}

const UserPusherEvents = {
  user_added,
  user_updated,
  user_deleted
}

export default UserPusherEvents;
