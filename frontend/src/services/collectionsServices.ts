import axios from 'axios';
import { getToken, mapAuthBearerToken } from "./utils";
import { API_URL } from "./constants";

const getAllCollections = async () => {
  const token = getToken();
  const { data } = await axios.get(`${API_URL}/cardCollections`, mapAuthBearerToken(token));

  return data.data;
}

const deleteCollection = async (collectionId: string) => {
  const token = getToken();
  return await axios.delete(`${API_URL}/cardCollections/${collectionId}`, mapAuthBearerToken(token));
}

const updateCollection = async (collectionId: string, cards: string[], name: string) => {
  const token = getToken();
  return await axios.patch(`${API_URL}/cardCollections/${collectionId}`, {
    name, cards
  }, mapAuthBearerToken(token));
}

const CollectionServices = {
  getAllCollections,
  deleteCollection,
  updateCollection,
}

export default CollectionServices;