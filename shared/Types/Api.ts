import { IResponseCard } from "./Card";
import { IResponseCollection } from "./Collection";
import { IResponseUser } from "./User";

export type IAPIResponse = {
  status: string
  message: string
}

export type ResponseError = IAPIResponse & {
  data: undefined
}

export type ResponseAuthSuccess = IAPIResponse & {
  data: IResponseUser;
}

export type IGetCard = IAPIResponse & {
  data: IResponseCard
}

export type IGetCards = IAPIResponse & {
  data: IResponseCard[]
  totalDocs: number
  totalPages: number
  totalOnPage: number
}

export type IGetCollection = IAPIResponse & {
  data: IResponseCollection
}

export type IGetCollections = IAPIResponse & {
  data: IResponseCollection[]
  totalDocs: number
  totalPages: number
  totalOnPage: number
}

export type IGetUser = IAPIResponse & {
  data: IResponseUser
}

export type IGetUsers = IAPIResponse & {
  data: IResponseUser[]
  totalDocs: number
  totalPages: number
  totalOnPage: number
}
