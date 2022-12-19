import { IResponseCard } from "@internal/shared";
import { RootState } from "../app/store";

export const getStateAllCards = (state: RootState): IResponseCard[] | [] => state.cards;
export const getStateCard = (cardId: string) => (state: RootState): IResponseCard | null => {
  return state.cards.find(c => c._id === cardId) || null;
};
