import axios from 'axios';
import { getToken, mapAuthBearerToken } from "./utils";
import { API_URL } from "./constants";

type RequestData = {
  name: string
  value: number
  description: string
  collectionId?: string
}

const getAllCards = async () => {
  const token = getToken();
  const { data } = await axios.get(`${API_URL}/cards`, mapAuthBearerToken(token));

  return data.data;
}

const createNewCard = async (cardData: RequestData) => {
  const token = getToken();
  const { data } = await axios.post(`${API_URL}/cards`, cardData, mapAuthBearerToken(token));

  return data.data;
}

const deleteCard = async (cardId: string) => {
  const token = getToken();
  return await axios.delete(`${API_URL}/cards/${cardId}`, mapAuthBearerToken(token));
}

const updateCard = async (cardId: string, dataToUpdate: RequestData) => {
  const token = getToken();
  return await axios.patch(`${API_URL}/cards/${cardId}`, dataToUpdate, mapAuthBearerToken(token));
}

const CardsServices = {
  getAllCards,
  deleteCard,
  updateCard,
  createNewCard,
}

export default CardsServices;