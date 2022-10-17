import axios from 'axios';
import { IUser } from "../slices/authSlice";
import { APIResponse, ResponseError } from "../utils/shared/types";
import { mapErrorResponse } from "../utils/utils";
import { API_URL } from "./constants";
import { getToken, mapAuthBearerToken } from "./utils";

interface ResponseAllUsers extends APIResponse {
  data: IUser[]
  totalDocs: number
  totalPages: number
  totalOnPage: number
}

interface ResponseUpdateSuccess extends APIResponse {
  data: IUser
}
interface ResponseGetSingleSuccess extends APIResponse {
  data: IUser
}

interface ResponseDeleteSuccess extends APIResponse {
  data: {}
}

const getSingleUser = async (userId: string): Promise<ResponseGetSingleSuccess | ResponseError> => {
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

const updateUser = async (userId: string, name: string, username: string): Promise<
  ResponseUpdateSuccess | ResponseError
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

const deleteUser = async (userId: string): Promise<ResponseDeleteSuccess | ResponseError> => {
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