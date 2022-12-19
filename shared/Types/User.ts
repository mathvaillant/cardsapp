import { Document, Types } from "mongoose"

export enum UserRoles {
  ADMIN = "admin",
  USER = "user"
}

export interface IUserBase {
  _id: Types.ObjectId
  name: string
  password: string
  username: string
  role: string
  cards: string[]
  collections: string[]
}

export type IUser = IUserBase &
  Document & {
    isPasswordCorrect: (
      inputPassword: string,
      currentUserPassword: string
    ) => boolean
  }

export type IEditUser = Partial<Omit<IUserBase, "password">> & {
  _id: Types.ObjectId
}

export type IRegisterUser = Pick<IUserBase, "name" | "username" | "password">

export type ILoginUser = Pick<IUserBase, "username" | "password">

export type IResponseUser = IUserBase & {
  token: string
  _id: string
}
