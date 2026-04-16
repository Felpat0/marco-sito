import { cards } from "./cards";
import { shuffleArray } from "@/utils";

export const generateDeck = () => {
  return shuffleArray(cards);
};
