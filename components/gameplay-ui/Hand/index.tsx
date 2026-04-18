"use client";
import { useRef, useState } from "react";
import { Card, CardProps } from "../Card";
import { handStyles } from "./style";
import { CardType } from "@/features/cardsManagement/types";

export type HandProps = {
  cards: CardType[];
  onCardPlay?: (cardId: CardType["id"]) => void;
  setHand?: (cards: CardType[]) => void;
};

export const Hand = ({ cards, onCardPlay, setHand }: HandProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [isDraggingCard, setIsDraggingCard] = useState(false);

  const handleRelease = (event: TouchEvent, cardId: CardType["id"]) => {
    setIsDraggingCard(false);
    const containerRect = containerRef.current?.getBoundingClientRect();

    if (containerRect) {
      const isInContainer =
        event.changedTouches[0].clientX >= containerRect.left &&
        event.changedTouches[0].clientX <= containerRect.right &&
        event.changedTouches[0].clientY >= containerRect.top &&
        event.changedTouches[0].clientY <= containerRect.bottom;
      if (isInContainer) {
        onCardPlay?.(cardId);
      }
    }

    if (event.changedTouches[0].clientY > window.innerHeight - 100) {
      const currentCardIndex = cards.findIndex((card) => card.id === cardId);
      let distancesArray = cards.map((currentCard, index) => {
        if (cardId === currentCard.id) return Infinity; // Ignore the dragged card itself
        const cardElement = cardsContainerRef.current?.children[
          index
        ] as HTMLElement;

        const cardRect = cardElement.getBoundingClientRect();
        return event.changedTouches[0].clientX - cardRect.left;
      });

      // If there are only negative distances, the card is dragged to the left of all cards
      if (
        distancesArray.every(
          (distance) => distance < 0 || distance === Infinity
        )
      ) {
        const newCards = [
          cards[currentCardIndex],
          ...cards.filter((card) => card.id !== cardId),
        ];
        setHand?.(newCards);
        return;
      }
      // Only positive distances because we want to reorder based on the left edge of the cards
      distancesArray = distancesArray.map((distance) =>
        distance < 0 ? Infinity : distance
      );

      // Find the closest card on the left
      const closestCardIndex = distancesArray.indexOf(
        Math.min(...distancesArray)
      );

      // Take all the cards until the closest card
      const newCards = cards.filter(
        (_, index) => index <= closestCardIndex && index !== currentCardIndex
      );
      // Add the dragged card
      newCards.push(cards[currentCardIndex]);
      // Add the remaining cards
      newCards.push(
        ...cards.filter(
          (_, index) => index > closestCardIndex && index !== currentCardIndex
        )
      );
      setHand?.(newCards);
    }
  };

  return (
    <>
      <div
        ref={containerRef}
        style={{ ...handStyles.playContainer.base }}
      ></div>
      <div
        ref={cardsContainerRef}
        className="hand-container"
        style={{ ...handStyles.handContainer.base }}
      >
        {cards.map((card, index) => (
          <Card
            key={card.id}
            id={card.id}
            index={index}
            cardsNumber={isDraggingCard ? cards.length - 1 : cards.length}
            name={card.name}
            imageUrl={card.imageUrl}
            type={card.type}
            power={card.power}
            onStartDrag={() => setIsDraggingCard(true)}
            onRelease={(event) => handleRelease(event, card.id)}
          />
        ))}
      </div>
    </>
  );
};
