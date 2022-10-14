import { createSlice } from '@reduxjs/toolkit';

type IPusherEventType = 'child_updated' | 'child_added' | 'child_deleted';

export interface IDataChanged {
  cards: { [key: string]: IPusherEventType }
  users: { [key: string]: IPusherEventType }
  collections: { [key: string]: IPusherEventType }
}

export interface IPusherTriggerData {
  data_changed: IDataChanged
}

const initialState = {
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
      console.log("🚀 ~ file: pusherSlice.ts ~ line 28 ~ mapPusherUpdates ~ payload", payload);
      state.data_changed = payload.data_changed;
    }
  },
});

const { reducer } = pusherUpdatesSlice;

export const { mapPusherUpdates } = pusherUpdatesSlice.actions;
export default reducer;