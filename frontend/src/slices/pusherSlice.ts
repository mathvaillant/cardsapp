import { createSlice } from '@reduxjs/toolkit';

type IPusherEventType = 'child_updated' | 'child_added' | 'child_deleted';

export enum IReason {
  card_added = 'card_added',
  card_updated = 'card_updated',
  card_deleted = 'card_deleted',
  collection_added = 'collection_added',
  collection_updated = 'collection_updated',
  collection_deleted = 'collection_deleted',
  user_added = 'user_added',
  user_updated = 'user_updated',
  user_deleted = 'user_deleted',
  null = 'null',
}
export interface IDataChanged {
  cards: { [key: string]: IPusherEventType }
  users: { [key: string]: IPusherEventType }
  collections: { [key: string]: IPusherEventType }
}

export interface IPusherTriggerData {
  reason: IReason | null
  data_changed: IDataChanged
}

const initialState: IPusherTriggerData = {
  reason: null,
  data_changed: {
    cards: {},
    users: {},
    collections: {},
  },
}

const pusherUpdatesSlice = createSlice({
  name: 'pusherUpdates',
  initialState,
  reducers: {
    mapPusherUpdates(state, { type, payload } : { type: string, payload: IPusherTriggerData }) {
      state.data_changed = payload.data_changed;
      state.reason = payload.reason || null;
    }
  },
});

const { reducer } = pusherUpdatesSlice;

export const { mapPusherUpdates } = pusherUpdatesSlice.actions;
export default reducer;