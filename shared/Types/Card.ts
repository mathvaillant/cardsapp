import { Document, Types } from 'mongoose';

export interface IBaseCard {
  _id: Types.ObjectId
  name: string
  value: number
  description: string
  createdBy: Types.ObjectId
  collectionId: string | undefined
  colors: string[]
}

export type ICard = IBaseCard & Document

export type ICreateCard = Omit<IBaseCard, "createdBy" | "colors" | '_id'>;

export type IEditCard = Partial<IBaseCard>;

export type IResponseCard = IBaseCard & {
  _id: string
  createdAt: string
  updatedAt: string
}
