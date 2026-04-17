import { CardsContext } from "@/features/cardsManagement/CardsContext";
import { useContext, useEffect } from "react";
import { Hand } from "../Hand";

export const BottomUI = () => {
  const { hand, playCard, generateHand } = useContext(CardsContext);

  useEffect(() => {
    generateHand();
  }, []);

  return <Hand cards={hand} onCardPlay={playCard} />;
};
