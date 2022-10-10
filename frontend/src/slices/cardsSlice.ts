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
    try {
      const response = await CardsServices.getAllCards();
      return response;
    } catch (error) {
      console.log("🚀 ~ file: cardsSlice.ts ~ line 24 ~ error", error)
    }
  }
)

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCards.fulfilled, (state, action) => {
        return action.payload.cards;
      })
  }
})

const { reducer } = cardsSlice;

export default reducer;