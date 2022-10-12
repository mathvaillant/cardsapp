import { RootState } from "../app/store";

export const getStateUsers = (state: RootState) => state?.users;
export const getStateLoggedUser = (state: RootState) => state?.auth?.user || null;
export const getStateUserIsAdmin = (state: RootState) => state?.auth?.user?.role === 'admin';
export const getStateUserUsername = (state: RootState) => state?.auth?.user?.username;
export const getStateUserById = (userId: string) => (state: RootState) => {
  return state?.users?.find(user => user._id === userId);
};