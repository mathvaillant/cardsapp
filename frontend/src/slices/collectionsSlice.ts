import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import CollectionServices from "../services/collectionsServices";

export interface ICollection {
  _id: string
  name: string
  createdBy: string
  createdAt: string
  updatedAt: string
}

const initialState: ICollection[] = [];

export const getAllCollections = createAsyncThunk(
  'collections/getAllCollections',
  async () => {
    const response = await CollectionServices.getAllCollections();
    return response.data;
  }
)

const collectionsSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCollections.fulfilled, (state, action) => {
        return action.payload;
      })
  }
})

const { reducer } = collectionsSlice;

export default reducer;