import { RootState } from "../app/store";

export const getStateAllCollections = (state: RootState) => state.collections;
export const getStateCollection = (collectionId: string) => (state: RootState) => state.collections.find(c => c._id === collectionId);
