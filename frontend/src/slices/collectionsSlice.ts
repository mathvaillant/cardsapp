import { IResponseCollection } from "@internal/shared";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import CollectionServices from "../services/collectionsServices";

const initialState: IResponseCollection[] = [];

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
