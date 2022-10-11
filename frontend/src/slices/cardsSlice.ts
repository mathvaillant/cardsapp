import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import CardsServices from "../services/cardsServices";

export interface ICard {
  _id: string
  name: string
  value: number
  description: string
  createdBy: string
  collectionId: string | undefined
  createdAt: string
  updatedAt: string
  colors: string[]
}

const initialState: ICard[] = [];

export const getAllCards = createAsyncThunk(
  'cards/getAllCards',
  async () => {
    const response = await CardsServices.getAllCards();
    return response.data;
  }
)

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCards.fulfilled, (state, action) => {
        return action.payload;
      })
  }
})

const { reducer } = cardsSlice;

export default reducer;