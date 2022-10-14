import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import {reducer as toastrReducer} from 'react-redux-toastr';
import authReducer from '../slices/authSlice';
import cardsReducer from '../slices/cardsSlice';
import usersReducer from '../slices/usersSlice';
import pusherUpdatesReducer from '../slices/pusherSlice';
import collectionsReducer from '../slices/collectionsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    pusherUpdates: pusherUpdatesReducer,
    toastr: toastrReducer,
    cards: cardsReducer,
    users: usersReducer,
    collections: collectionsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
