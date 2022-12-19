import { IResponseUser } from "@internal/shared";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import UserServices from "../services/userServices";

const initialState: IResponseUser[] = [];

export const getAllUsers = createAsyncThunk(
  'users/getAllUsers',
  async () => {
    const { data } = await UserServices.getAllUsers();
    return data;
  }
)

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.fulfilled, (state, action) => {
        return action.payload;
      })
  }
})

const { reducer } = usersSlice;

export default reducer;
