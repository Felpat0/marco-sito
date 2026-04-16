"use client";
import { getStyleFromStructure } from "@/utils";
import { cardStyles } from "./style";
import { useCallback, useEffect, useRef, useState } from "react";
import { onCardTouchMove } from "./utils";

export type CardProps = {
  id: number;
  name: string;
  description?: string;
  imageUrl: string;
  type: string;
  power: number;
  onRelease?: (event: TouchEvent) => void;
};

export const Card = ({
  name,
  description,
  imageUrl,
  type,
  power,
  onRelease,
}: CardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [touchPosition, setTouchPosition] = useState({ top: 0, left: 0 });
  const [initialPositionOffset, setInitialPositionOffset] = useState({
    top: 0,
    left: 0,
  });
  const cardContainerRef = useRef<HTMLDivElement>(null);

  const handleRelease = useCallback(
    (event: TouchEvent) => {
      if (!isHovered) return;
      setIsHovered(false);
      onRelease && onRelease(event);
    },
    [isHovered, onRelease]
  );

  const handleTouchStart = useCallback(
    (event: TouchEvent) => {
      // If the touch start is not on this card, ignore it
      if (
        cardContainerRef.current &&
        !cardContainerRef.current.contains(event.target as Node)
      ) {
        return;
      }
      setIsHovered(true);
      const touchPosition = {
        y: event.touches[0].clientY,
        x: event.touches[0].clientX,
      };
      const cardOrigin = {
        x: cardContainerRef.current?.getBoundingClientRect().left || 0,
        y: cardContainerRef.current?.getBoundingClientRect().top || 0,
      };

      onCardTouchMove(event, setTouchPosition);
      setInitialPositionOffset({
        top: touchPosition.y - cardOrigin.y,
        left: touchPosition.x - cardOrigin.x,
      });
    },
    [touchPosition]
  );

  const handleTouchMove = useCallback(
    (event: TouchEvent) => onCardTouchMove(event, setTouchPosition),
    []
  );

  useEffect(() => {
    document.addEventListener("touchend", handleRelease);
    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchmove", handleTouchMove);
    return () => {
      document.removeEventListener("touchend", handleRelease);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, [handleRelease, handleTouchStart, handleTouchMove]);

  return (
    <div
      ref={cardContainerRef}
      className="card"
      style={{
        ...getStyleFromStructure(cardStyles, "cardContainer", isHovered),
        backgroundImage: `url(${imageUrl})`,
        ...(isHovered
          ? {
              top: touchPosition.top - initialPositionOffset.top,
              left: touchPosition.left - initialPositionOffset.left,
            }
          : {}),
      }}
    >
      <h3 style={getStyleFromStructure(cardStyles, "cardName", isHovered)}>
        {name}
      </h3>
      {description && <p>{description}</p>}
      {/* <span className="type">{type}</span>
      <span className="power">{power}</span> */}
    </div>
  );
};
