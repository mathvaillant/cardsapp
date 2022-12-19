import { IUser } from "@internal/shared";

export {};

declare global {
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}
