import { IPusherTriggerData } from "@internal/shared";
import { createSlice } from '@reduxjs/toolkit';

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
