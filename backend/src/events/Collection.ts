import { ICollection } from "@internal/shared";
import PusherInit from "../pusher";
import { mapKeyValueEvent } from "../utils/mapKeyValueEvent";

const PUSHER_CHANNEL = 'collections';

const collection_added = (collection: ICollection) => {
  PusherInit.trigger(PUSHER_CHANNEL, 'child_added', {
    reason: 'collection_added',
    data_changed: {
      collections: mapKeyValueEvent([collection._id], 'child_added'), 
      users: mapKeyValueEvent([collection.createdBy.toString()], 'child_updated'), 
    }, 
  });
}

const collection_updated = (collection: ICollection) => {
  PusherInit.trigger(PUSHER_CHANNEL, 'child_updated', {
    reason: 'collection_updated',
    data_changed: {
      collections: mapKeyValueEvent([collection._id], 'child_updated'), 
    }, 
  });
}

const collection_deleted = (collection: ICollection, cardsIds: string[]) => {
  PusherInit.trigger(PUSHER_CHANNEL, 'child_deleted', {  
    reason: 'collection_deleted',
    data_changed: {
      collections: mapKeyValueEvent([collection._id], 'child_deleted'), 
      users: mapKeyValueEvent([collection.createdBy.toString()], 'child_updated'), 
      cards: mapKeyValueEvent(cardsIds, 'child_updated'), 
    },
  });
}

const CollectionPusherEvents = {
  collection_added,
  collection_updated,
  collection_deleted,
};

export default CollectionPusherEvents;
