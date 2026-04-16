"use client";
import { useRef } from "react";
import { Card, CardProps } from "../Card";
import { handStyles } from "./style";

export type HandProps = {
  cards: CardProps[];
  setCards?: (cards: CardProps[]) => void;
  onCardPlay?: (card: CardProps) => void;
};

export const Hand = ({ cards, setCards, onCardPlay }: HandProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div
      className="hand-container"
      ref={containerRef}
      style={{ ...handStyles.handContainer.base }}
    >
      {cards.map((card, index) => (
        <Card
          key={index}
          id={card.id}
          name={card.name}
          imageUrl={card.imageUrl}
          type={card.type}
          power={card.power}
          onRelease={(event) => {
            const containerRect = containerRef.current?.getBoundingClientRect();

            if (containerRect) {
              const isInContainer =
                event.changedTouches[0].clientX >= containerRect.left &&
                event.changedTouches[0].clientX <= containerRect.right &&
                event.changedTouches[0].clientY >= containerRect.top &&
                event.changedTouches[0].clientY <= containerRect.bottom;
              if (!isInContainer) {
                onCardPlay?.(card);
                setCards?.(cards.filter((c) => c !== card));
              }
            }
          }}
        />
      ))}
    </div>
  );
};
