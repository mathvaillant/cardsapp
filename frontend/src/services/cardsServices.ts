import axios from 'axios';
import { getToken, mapAuthBearerToken } from "./utils";
import { API_URL } from "./constants";
import { APIResponse, ResponseError } from "../utils/shared/types";
import { ICard } from "../slices/cardsSlice";
import { mapErrorResponse } from "../utils/utils";

interface RequestData {
  name?: string | undefined
  value?: number | undefined
  description?: string | undefined
  collectionId?: string | undefined
}

interface ResponseCreateSuccess extends APIResponse {
  data: ICard;
}

interface ResponseUpdateSuccess extends ResponseCreateSuccess {}
interface ResponseUpdateMultipleSuccess extends APIResponse {
  data: {},
}

interface ResponseDeleteSuccess extends APIResponse {
  data: {};
}

interface ResponseGetAllSuccess extends APIResponse {
  data: ICard[]
  results: number
}

const getAllCards = async (): Promise<ResponseGetAllSuccess | ResponseError> => {
  try {
    const token = getToken();
    const { data } = await axios.get(`${API_URL}/cards`, mapAuthBearerToken(token));
    return data;
  } catch (error) {
    return mapErrorResponse(error);    
  }
}

const createNewCard = async (cardData: RequestData): Promise<ResponseCreateSuccess | ResponseError> => {
  try {
    const token = getToken();
    const { data } = await axios.post(`${API_URL}/cards`, cardData, mapAuthBearerToken(token));
    return data;
  } catch (error) {
    return mapErrorResponse(error);
  }
}

const deleteCard = async (cardId: string): Promise<ResponseDeleteSuccess | ResponseError> => {
  const token = getToken();
  try {
    const { data } = await axios.delete(`${API_URL}/cards/${cardId}`, mapAuthBearerToken(token));
    return data;
  } catch (error) {
    return mapErrorResponse(error);
  }
}

const updateCard = async (cardId: string, dataToUpdate: RequestData): Promise<
ResponseUpdateSuccess | ResponseError
> => {
  try {
    const token = getToken();
    const { data } = await axios.patch(`${API_URL}/cards/${cardId}`, dataToUpdate, mapAuthBearerToken(token));
    return data;
  } catch (error) {
    return mapErrorResponse(error);
  }
}

const updateMultiple = async (cardsIds: string[], collectionId: string): Promise<
  ResponseUpdateMultipleSuccess | ResponseError
>  => {
  const token = getToken();
  const { data } = await axios.post(`${API_URL}/cards/updateMultiple`, {
    cardsIds,
    collectionId
  }, mapAuthBearerToken(token));

  return data;
}

const CardsServices = {
  getAllCards,
  deleteCard,
  updateCard,
  createNewCard,
  updateMultiple,
}

export default CardsServices;