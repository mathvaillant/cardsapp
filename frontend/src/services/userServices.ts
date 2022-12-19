import { IGetUser, ResponseError } from "@internal/shared";
import axios from 'axios';
import { API_URL } from "../constants/api";
import { getToken, mapAuthBearerToken, mapErrorResponse } from "../utils/utils";

const getSingleUser = async (userId: string): Promise<IGetUser | ResponseError> => {
  try {
    const token = getToken();
    const { data } = await axios.get(`${API_URL}/users/${userId}`, mapAuthBearerToken(token));
    return data;
  } catch (error) {
    return mapErrorResponse(error);
  }
}

const getAllUsers = async (page: number = 1, searchValue: string = '') => {
  try {
    const token = getToken();
    const reqUrl = `${API_URL}/users?page=${page}&searchValue=${searchValue}`;
    const { data } = await axios.get(reqUrl, mapAuthBearerToken(token)); 
    return data;
  } catch (error) {
    return mapErrorResponse(error);
  }
}

const updateUser = async (userId: string, name: string, username: string): Promise<IGetUser | ResponseError
> => {
  try {
    const token = getToken();
    const { data } = await axios.patch(`${API_URL}/users/${userId}`, {
      name, username
    }, mapAuthBearerToken(token));
    return data;
  } catch (error) {
    return mapErrorResponse(error);
  }
}

const deleteUser = async (userId: string): Promise<{ data: {} } | ResponseError> => {
  try {
    const token = getToken();
    const { data } = await axios.delete(`${API_URL}/users/${userId}`, mapAuthBearerToken(token));
    return data;
  } catch (error) {
    return mapErrorResponse(error);
  }
}

const UserServices = {
  getAllUsers,
  updateUser,
  deleteUser,
  getSingleUser
}

export default UserServices;
