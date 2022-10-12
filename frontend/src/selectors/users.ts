import { RootState } from "../app/store";

export const getStateUsers = (state: RootState) => state?.users;
export const getStateUser = (state: RootState) => state?.auth?.user;
export const getStateUserIsAdmin = (state: RootState) => state?.auth?.user?.role === 'admin';
export const getStateUserUsername = (state: RootState) => state?.auth?.user?.username;