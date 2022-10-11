import axios from 'axios';
import { getToken, mapAuthBearerToken } from "./utils";
import { API_URL } from "./constants";
import { ICollection } from "../slices/collectionsSlice";
import { APIResponse, ResponseError } from "../utils/shared/types";
import { mapErrorResponse } from "../utils/utils";


interface ResponseCreateSuccess extends APIResponse {
  data: ICollection;
}

interface ResponseUpdateSuccess extends ResponseCreateSuccess {}

interface ResponseDeleteSuccess extends APIResponse {
  data: {};
}

interface ResponseGetAllSuccess extends APIResponse {
  data: ICollection[]
  results: number
}

const getAllCollections = async (): Promise<ResponseGetAllSuccess | ResponseError> => {
  try {
    const token = getToken();
    const { data } = await axios.get(`${API_URL}/cardCollections`, mapAuthBearerToken(token));

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
}

export default CollectionServices;