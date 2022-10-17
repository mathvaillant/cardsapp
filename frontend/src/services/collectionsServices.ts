import axios from 'axios';
import { getToken, mapAuthBearerToken } from "./utils";
import { API_URL } from "./constants";
import { ICollection } from "../slices/collectionsSlice";
import { APIResponse, ResponseError } from "../utils/shared/types";
import { mapErrorResponse } from "../utils/utils";


interface ResponseCreateSuccess extends APIResponse {
  data: ICollection;
}

interface ResponseGetSingleSuccess extends APIResponse {
  data: ICollection;
}

interface ResponseUpdateSuccess extends ResponseCreateSuccess {}

interface ResponseDeleteSuccess extends APIResponse {
  data: {};
}

interface ResponseGetAllSuccess extends APIResponse {
  data: ICollection[]
}

const getSingleCollection = async (collectionId: string): Promise<ResponseGetSingleSuccess | ResponseError> => {
  const token = getToken();
  try {
    const { data } = await axios.get(`${API_URL}/cardCollections/${collectionId}`, mapAuthBearerToken(token));
    return data;
  } catch (error) {
    return mapErrorResponse(error);
  }
}

const getAllCollections = async (page: number = 1, searchValue: string = '') => {
  try {
    const token = getToken();
    const reqUrl = `${API_URL}/cardCollections?page=${page}&searchValue=${searchValue}`;
    const { data } = await axios.get(reqUrl, mapAuthBearerToken(token));

    return data;
  } catch (error) {
    return mapErrorResponse(error);
  }
}

const deleteCollection = async (collectionId: string): Promise<ResponseDeleteSuccess | ResponseError> => {
  try {
    const token = getToken();
    const { data } = await axios.delete(`${API_URL}/cardCollections/${collectionId}`, mapAuthBearerToken(token));
    return data;
  } catch (error: any) {
    return mapErrorResponse(error);
  }
}

const updateCollection = async (collectionId: string, name: string | undefined) : Promise<
  ResponseUpdateSuccess | ResponseError
  > => {
    try {
      const token = getToken();
      const { data } = await axios.patch(`${API_URL}/cardCollections/${collectionId}`, {
        name,
      }, mapAuthBearerToken(token));

      return data;
    } catch (error: any) {
      return mapErrorResponse(error);
    }
}

const createNewCollection = async (name: string): Promise<ResponseCreateSuccess | ResponseError> => {
  try {
    const token = getToken();
    const { data } = await axios.post(`${API_URL}/cardCollections`, {
      name,
    }, mapAuthBearerToken(token));

    return data;
  } catch (error: any) {
    return mapErrorResponse(error);
  }
}

const CollectionServices = {
  getAllCollections,
  deleteCollection,
  updateCollection,
  createNewCollection,
  getSingleCollection
}

export default CollectionServices;