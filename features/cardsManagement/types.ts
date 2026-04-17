export type CardsContextType = {
  deck: CardType[];
  hand: CardType[];
  setDeck: (deck: CardType[]) => void;
  setHand: (hand: CardType[]) => void;
  drawCard: () => void;
  playCard: (cardId: CardType["id"]) => void;
  refreshDeck: () => void;
  generateHand: () => void;
};

export type CardType = {
  id: number;
  name: string;
  imageUrl: string;
  type: "heal" | "attack" | "defend";
  power: number;
};

export type DeckType = {
  cards: CardType[];
};
