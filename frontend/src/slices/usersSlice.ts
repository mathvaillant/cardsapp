import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import UserServices from "../services/userServices";
import { IUser } from "./authSlice";

const initialState: IUser[] = [];

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