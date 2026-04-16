"use client";
import { Hand } from "@/components/gameplay-ui/Hand";
import { CardsContext } from "@/features/cardsManagement/CardsContext";
import { useContext, useEffect } from "react";

export default function CardsManagementTest() {
  const { hand, playCard, generateHand } = useContext(CardsContext);

  useEffect(() => {
    generateHand();
  }, []);

  return (
    <div style={{ display: "flex", alignItems: "flex-end", height: "100vh" }}>
      <Hand cards={hand} onCardPlay={playCard} />
    </div>
  );
}
