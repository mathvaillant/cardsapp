import axios from 'axios';
import { API_URL } from "./constants";

const signUp = async (name: string, username: string, password: string) => {
  const { data } = await axios.post(`${API_URL}/users/signup`, {
    name,
    username,
    password
  })

  if(data.data.user) {
    localStorage.setItem('user', JSON.stringify(data.data.user));
  }

  return data;
};

const login = async (username: string, password: string) => {
  const { data } = await axios.post(`${API_URL}/users/login`, {
    username,
    password
  })
  console.log("🚀 ~ file: authServices.ts ~ line 23 ~ login ~ data", data)

  if(data.data.user) {
    localStorage.setItem('user', JSON.stringify(data.data.user));
  }

  return data;
};

const logout = () => {
  localStorage.removeItem('user');
}

const AuthServices = {
  signUp,
  login,
  logout
}

export default AuthServices;