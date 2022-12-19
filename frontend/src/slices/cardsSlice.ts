import { IResponseCard } from "@internal/shared";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import CardsServices from "../services/cardsServices";

const initialState: IResponseCard[] = [];

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
