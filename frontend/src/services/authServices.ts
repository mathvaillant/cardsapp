import { ResponseAuthSuccess, ResponseError } from "@internal/shared";
import axios from 'axios';
import { API_URL } from "../constants/api";

const signUp = async (
  name: string, 
  username: string, 
  password: string
): Promise<ResponseAuthSuccess | ResponseError> => {
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

const login = async (
  username: string, 
  password: string
): Promise<ResponseAuthSuccess | ResponseError> => {
  const { data } = await axios.post(`${API_URL}/auth/login`, {
    username,
    password
  });

  if(data.data.token) {
    localStorage.setItem('user', JSON.stringify(data.data));
  }

  return data;
};

const logout = (): void => {
  localStorage.removeItem('user');
  window.location.replace('/login');
}

const AuthServices = {
  signUp,
  login,
  logout
}

export default AuthServices;
