import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import CollectionServices from "../services/collectionsServices";

export interface ICollection {
  _id: string
  name: string
  createdBy: string
  cards: string[]
  createdAt: string
  updatedAt: string
}

const initialState: ICollection[] = [];

export const getAllCollections = createAsyncThunk(
  'collections/getAllCollections',
  async () => {
    try {
      const response = await CollectionServices.getAllCollections();
      return response;
    } catch (error) {
      console.log("🚀 ~ file: collectionsSlice.ts ~ line 22 ~ error", error);
    }
  }
)

const collectionsSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCollections.fulfilled, (state, action) => {
        return action.payload.collections;
      })
  }
})

const { reducer } = collectionsSlice;

export default reducer;