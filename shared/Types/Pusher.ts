export type IPusherEventType = 'child_updated' | 'child_added' | 'child_deleted';

export type IReason = 'card_added' | 'card_updated' | 'card_deleted' | 'collection_added' | 'collection_updated' | 'collection_deleted' | 'user_added' | 'user_updated' | 'user_deleted';
export interface IDataChanged {
  cards: { [key: string]: IPusherEventType }
  users: { [key: string]: IPusherEventType }
  collections: { [key: string]: IPusherEventType }
}

export interface IPusherTriggerData {
  reason: IReason | null
  data_changed: IDataChanged
}