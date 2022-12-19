import axios from "axios"
import { getToken, mapAuthBearerToken, mapErrorResponse } from "../utils/utils"
import { API_URL } from "../constants/api"
import {
  ICreateCard,
  IEditCard,
  IGetCard,
  IGetCards,
  IResponseCard,
  ResponseError
} from "@internal/shared"

const getSingleCard = async (
  cardId: string
): Promise<IGetCard | ResponseError> => {
  const token = getToken()

  try {
    const { data } = await axios.get(
      `${API_URL}/cards/${cardId}`,
      mapAuthBearerToken(token)
    )
    return data
  } catch (error) {
    return mapErrorResponse(error)
  }
}

const getAllCards = async (page: number = 1, searchValue: string = "") => {
  try {
    const token = getToken()
    const reqUrl = `${API_URL}/cards?page=${page}&searchValue=${searchValue}`
    const { data } = await axios.get(reqUrl, mapAuthBearerToken(token))
    return data
  } catch (error) {
    return mapErrorResponse(error)
  }
}

const getCardsInCollection = async (
  collectionId: string
): Promise<IGetCards | ResponseError> => {
  try {
    const token = getToken()
    const reqUrl = `${API_URL}/cards/byCollection?collectionId=${collectionId}`
    const { data } = await axios.get(reqUrl, mapAuthBearerToken(token))
    return data
  } catch (error) {
    return mapErrorResponse(error)
  }
}

const createNewCard = async (
  cardData: ICreateCard
): Promise<IGetCard | ResponseError> => {
  try {
    const token = getToken()
    const { data } = await axios.post(
      `${API_URL}/cards`,
      cardData,
      mapAuthBearerToken(token)
    )
    return data
  } catch (error) {
    return mapErrorResponse(error)
  }
}

const deleteCard = async (
  cardId: string
): Promise<{ data: {} } | ResponseError> => {
  const token = getToken()
  try {
    const { data } = await axios.delete(
      `${API_URL}/cards/${cardId}`,
      mapAuthBearerToken(token)
    )
    return data
  } catch (error) {
    return mapErrorResponse(error)
  }
}

const updateCard = async (
  cardId: string,
  dataToUpdate: IEditCard
): Promise<IResponseCard | ResponseError> => {
  try {
    const token = getToken()
    const { data } = await axios.patch(
      `${API_URL}/cards/${cardId}`,
      dataToUpdate,
      mapAuthBearerToken(token)
    )
    return data
  } catch (error) {
    return mapErrorResponse(error)
  }
}

const updateMultiple = async (
  cardsIds: string[],
  collectionId: string
): Promise<IResponseCard | ResponseError> => {
  const token = getToken()
  const { data } = await axios.post(
    `${API_URL}/cards/updateMultiple`,
    {
      cardsIds,
      collectionId
    },
    mapAuthBearerToken(token)
  )

  return data
}

const CardsServices = {
  getAllCards,
  getSingleCard,
  deleteCard,
  updateCard,
  createNewCard,
  updateMultiple,
  getCardsInCollection
}

export default CardsServices
