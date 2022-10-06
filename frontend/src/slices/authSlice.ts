import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import AuthServices from "../services/authServices";

const user = JSON.parse(localStorage.getItem('user') as string);

const initialState = user
 ? { isLoggedIn: true, user }
 : { isLoggedIn: false, user: null };

export const signUp = createAsyncThunk(
  'auth/signup',
  async ({ name, username, password } : { name: string, username: string, password: string }) => {
    try {
      const response = await AuthServices.signUp(name, username, password);
      return response;
    } catch (error) {
      console.log("🚀 ~ file: signupActions.ts ~ line 14 ~ error", error);
    }
  }
)

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password } : { username: string, password: string }) => {
    try {
      const response = await AuthServices.login(username, password);
      return response;
    } catch (error) {
      console.log("🚀 ~ file: signupActions.ts ~ line 14 ~ error", error);
    }
  }
)

export const logout = createAsyncThunk('auth/logout', async () => await AuthServices.logout());

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload.data.user;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload.data.user;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.user = null;
      });
  },
})

const { reducer } = authSlice;

export default reducer;