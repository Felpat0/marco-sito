"use client";
import { useRef, useState } from "react";
import { Card, CardProps } from "../Card";
import { handStyles } from "./style";
import { CardType } from "@/features/cardsManagement/types";

export type HandProps = {
  cards: CardType[];
  onCardPlay?: (cardId: CardType["id"]) => void;
};

export const Hand = ({ cards, onCardPlay }: HandProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDraggingCard, setIsDraggingCard] = useState(false);

  return (
    <div
      className="hand-container"
      style={{ ...handStyles.handContainer.base }}
    >
      <div
        ref={containerRef}
        style={{ ...handStyles.playContainer.base }}
      ></div>
      {cards.map((card, index) => (
        <Card
          key={index}
          id={card.id}
          index={index}
          cardsNumber={isDraggingCard ? cards.length - 1 : cards.length}
          name={card.name}
          imageUrl={card.imageUrl}
          type={card.type}
          power={card.power}
          onStartDrag={() => setIsDraggingCard(true)}
          onRelease={(event) => {
            setIsDraggingCard(false);
            const containerRect = containerRef.current?.getBoundingClientRect();

            if (containerRect) {
              const isInContainer =
                event.changedTouches[0].clientX >= containerRect.left &&
                event.changedTouches[0].clientX <= containerRect.right &&
                event.changedTouches[0].clientY >= containerRect.top &&
                event.changedTouches[0].clientY <= containerRect.bottom;
              if (isInContainer) {
                onCardPlay?.(card?.id);
              }
            }
          }}
        />
      ))}
    </div>
  );
};
