import _ from 'underscore';
import { RootState } from "../app/store";
import { ICard } from "../slices/cardsSlice";

export const getStateAllCards = (state: RootState): ICard[] | [] => state.cards;
export const getStateCard = (cardId: string) => (state: RootState): ICard | null => {
  return state.cards.find(c => c._id === cardId) || null;
};