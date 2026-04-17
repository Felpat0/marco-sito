import { CardsContext } from "@/features/cardsManagement/CardsContext";
import { useCallback, useContext, useEffect } from "react";
import { Hand } from "../Hand";
import { useGame } from "@/app/gameContext";
import { CardType } from "@/features/cardsManagement/types";

export const BottomUI = () => {
  const { hand, playCard, drawCard } = useContext(CardsContext);
  const { attack, defend, heal, isPlayerTurn } = useGame();
  useEffect(() => {
    if (isPlayerTurn) {
      drawCard();
    }
  }, [isPlayerTurn]);

  const handleCardPlay = useCallback(
    (cardId: CardType["id"]) => {
      if (!isPlayerTurn) return;
      const card = hand.find((c) => c.id === cardId);
      if (!card) return;

      switch (card.type) {
        case "attack":
          attack(card.power);
          break;
        case "defend":
          defend(card.power);
          break;
        case "heal":
          heal(card.power);
          break;
        default:
          break;
      }
      playCard(cardId);
    },
    [hand, attack, defend, heal, playCard, isPlayerTurn]
  );

  return <Hand cards={hand} onCardPlay={handleCardPlay} />;
};
