import { RootState } from "../app/store";

export const getStateAllCards = (state: RootState) => state.cards;
export const getStateCard = (cardId: string) => (state: RootState) => state.cards.find(c => c._id === cardId);