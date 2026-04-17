import { createContext, useCallback, useState } from "react";
import { CardsContextType, CardType } from "./types";
import { generateDeck } from "./deck";

const HAND_SIZE = 3;

export const CardsContext = createContext<CardsContextType>({
  deck: [],
  hand: [],
  generateHand: () => {},
  setDeck: () => {},
  setHand: () => {},
  drawCard: () => {},
  playCard: () => {},
  refreshDeck: () => {},
});

export const CardsProvider = ({ children }: { children: React.ReactNode }) => {
  const [deck, setDeck] = useState<CardType[]>([]);
  const [hand, setHand] = useState<CardType[]>([]);

  const playCard = useCallback(
    (cardId: CardType["id"]) => {
      setHand(hand.filter((card) => card.id !== cardId));
    },
    [hand]
  );

  const refreshDeck = useCallback(
    (currentHand?: CardType[], updateState: boolean = true): CardType[] => {
      const newDeck = generateDeck();
      const handCardsIds = currentHand
        ? currentHand.map((card) => card.id)
        : hand.map((card) => card.id);

      if (updateState) {
        setDeck(newDeck.filter((card) => !handCardsIds.includes(card.id)));
      }
      return newDeck.filter((card) => !handCardsIds.includes(card.id));
    },
    [hand]
  );

  const drawCard = useCallback(
    (count: number = 1, clearHand: boolean = false) => {
      let deckToDrawFrom = deck;
      let handToDrawTo = hand;

      if (clearHand) {
        handToDrawTo = [];
      }

      for (let i = 0; i < count; i++) {
        if (!deckToDrawFrom.length) {
          deckToDrawFrom = refreshDeck(handToDrawTo, false);
        }

        if (!deckToDrawFrom.length) {
          return;
        }

        const cardToDraw = deckToDrawFrom[0];

        deckToDrawFrom = deckToDrawFrom.slice(1);
        handToDrawTo = [...handToDrawTo, cardToDraw];

        if (deckToDrawFrom.slice(1).length === 0) {
          refreshDeck(handToDrawTo, false);
        }
      }
      setDeck(deckToDrawFrom);
      setHand(handToDrawTo);
    },
    [deck, hand, refreshDeck]
  );

  const generateHand = useCallback(() => {
    console.log("Generating hand...");
    drawCard(HAND_SIZE, true);
  }, [drawCard]);

  return (
    <CardsContext.Provider
      value={{
        deck,
        hand,
        generateHand,
        setDeck,
        setHand,
        drawCard,
        playCard,
        refreshDeck,
      }}
    >
      {children}
    </CardsContext.Provider>
  );
};
