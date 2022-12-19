import axios from "axios"
import { getToken, mapAuthBearerToken, mapErrorResponse } from "../utils/utils"
import { API_URL } from "../constants/api"
import { IGetCollection, ResponseError } from "@internal/shared"

const getSingleCollection = async (
  collectionId: string
): Promise<IGetCollection | ResponseError> => {
  const token = getToken()
  try {
    const { data } = await axios.get(
      `${API_URL}/collections/${collectionId}`,
      mapAuthBearerToken(token)
    )
    return data
  } catch (error) {
    return mapErrorResponse(error)
  }
}

const getAllCollections = async (
  page: number = 1,
  searchValue: string = ""
) => {
  try {
    const token = getToken()
    const reqUrl = `${API_URL}/collections?page=${page}&searchValue=${searchValue}`
    const { data } = await axios.get(reqUrl, mapAuthBearerToken(token))

    return data
  } catch (error) {
    return mapErrorResponse(error)
  }
}

const deleteCollection = async (
  collectionId: string
): Promise<{ data: {} } | ResponseError> => {
  try {
    const token = getToken()
    const { data } = await axios.delete(
      `${API_URL}/collections/${collectionId}`,
      mapAuthBearerToken(token)
    )
    return data
  } catch (error: any) {
    return mapErrorResponse(error)
  }
}

const updateCollection = async (
  collectionId: string,
  name: string | undefined
): Promise<IGetCollection | ResponseError> => {
  try {
    const token = getToken()
    const { data } = await axios.patch(
      `${API_URL}/collections/${collectionId}`,
      {
        name
      },
      mapAuthBearerToken(token)
    )

    return data
  } catch (error: any) {
    return mapErrorResponse(error)
  }
}

const createNewCollection = async (
  name: string
): Promise<IGetCollection | ResponseError> => {
  try {
    const token = getToken()
    const { data } = await axios.post(
      `${API_URL}/collections`,
      {
        name
      },
      mapAuthBearerToken(token)
    )

    return data
  } catch (error: any) {
    return mapErrorResponse(error)
  }
}

const CollectionServices = {
  getAllCollections,
  deleteCollection,
  updateCollection,
  createNewCollection,
  getSingleCollection
}

export default CollectionServices
