import { Document, Types } from 'mongoose';

export interface ICollectionBase {
  _id: Types.ObjectId
  name: string
  createdBy: Types.ObjectId
}

export type ICollection = ICollectionBase & Document;

export type ICreateCollection = Omit<ICollectionBase, '_id'>;

export type IEditCollection = Partial<ICollectionBase>;

export type IResponseCollection = ICollectionBase & {
  _id: string
  createdAt: string
  updatedAt: string
}
