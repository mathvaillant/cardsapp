import { ILoginUser, IRegisterUser, IResponseUser } from "@internal/shared";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AuthServices from "../services/authServices";

const user = JSON.parse(localStorage.getItem('user') as string);

const initialState = user
 ? { isLoggedIn: true, user, error: '' }
 : { isLoggedIn: false, user: null, error: '' };

export const signUp = createAsyncThunk(
  'auth/signup',
  async ({ name, username, password } : IRegisterUser ) => {
    try {
      const response = await AuthServices.signUp(name, username, password);
      return response;
    } catch (error: any) {
      const errorMessage = error.response.data.message;
      throw new Error(errorMessage);
    }
  }
)

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password } : ILoginUser ) => {
    try {
      const response = await AuthServices.login(username, password);
      return response;
    } catch (error: any) {
      const errorMessage = error.response.data.message;
      throw new Error(errorMessage);
    }
  }
)

export const logout = createAsyncThunk('auth/logout', async () => await AuthServices.logout());

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateLoggedUser(state, action) {
      state.user = action.payload as IResponseUser;

      const currentUserData = JSON.parse(localStorage.getItem('user') as string);
      localStorage.setItem('user', JSON.stringify({
        ...action.payload,
        token: currentUserData.token,
      }));
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload.data;
        state.error = '';
      })
      .addCase(signUp.rejected, (state, action) => {
        state.error = action.error.message as string;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload?.data;
        state.error = '';
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message as string;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.user = null;
      });
  },
})

const { reducer } = authSlice;

export const { updateLoggedUser } = authSlice.actions;
export default reducer;
