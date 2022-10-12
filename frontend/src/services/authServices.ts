import axios from 'axios';
import { IUser } from "../slices/authSlice";
import { APIResponse, ResponseError } from "../utils/shared/types";
import { API_URL } from "./constants";

interface ResponseAuthSuccess extends APIResponse {
  data: IUser;
}

const signUp = async (name: string, username: string, password: string): Promise<ResponseAuthSuccess | ResponseError> => {
  const { data } = await axios.post(`${API_URL}/auth/signup`, {
    name,
    username,
    password
  });

  if(data.data.token) {
    localStorage.setItem('user', JSON.stringify(data.data));
  }

  return data;
};

const login = async (username: string, password: string): Promise<ResponseAuthSuccess | ResponseError> => {
  const { data } = await axios.post(`${API_URL}/auth/login`, {
    username,
    password
  });

  if(data.data.token) {
    localStorage.setItem('user', JSON.stringify(data.data));
  }

  return data;
};

const logout = () => {
  localStorage.removeItem('user');
  window.location.reload();
}

const AuthServices = {
  signUp,
  login,
  logout
}

export default AuthServices;