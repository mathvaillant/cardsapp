import { RootState } from "../app/store";

export const getStateUserIsAdmin = (state: RootState) => state?.auth?.user?.role === 'admin';
export const getStateUserUsername = (state: RootState) => state?.auth?.user?.username;