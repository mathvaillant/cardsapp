import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import {reducer as toastrReducer} from 'react-redux-toastr';
import authReducer from '../slices/authSlice';
import cardsReducer from '../slices/cardsSlice';
import collectionsReducer from '../slices/collectionsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    toastr: toastrReducer,
    cards: cardsReducer,
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
