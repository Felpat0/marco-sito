"use client";
import { getStyleFromStructure } from "@/utils";
import { cardStyles } from "./style";
import { useEffect, useState } from "react";
import { onCardTouchMove } from "./utils";

export type CardProps = {
  name: string;
  description?: string;
  imageUrl: string;
  type: string;
  power: number;
};

export const Card = ({
  name,
  description,
  imageUrl,
  type,
  power,
}: CardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [touchPosition, setTouchPosition] = useState({ top: 0, left: 0 });
  const [initialPositionOffset, setInitialPositionOffset] = useState({
    top: 0,
    left: 0,
  });

  useEffect(() => {
    document.addEventListener("touchend", () => setIsHovered(false));
    document.addEventListener("touchstart", (event) => {
      setInitialPositionOffset({
        top: event.touches[0].clientY - touchPosition.top,
        left: event.touches[0].clientX - touchPosition.left,
      });
      onCardTouchMove(event, setTouchPosition);
    });
    document.addEventListener("touchmove", (event) =>
      onCardTouchMove(event, setTouchPosition)
    );
    return () => {
      document.removeEventListener("touchend", () => setIsHovered(false));
      document.removeEventListener("touchstart", (event) => {
        setInitialPositionOffset({
          top: event.touches[0].clientY - touchPosition.top,
          left: event.touches[0].clientX - touchPosition.left,
        });
        onCardTouchMove(event, setTouchPosition);
      });
      document.removeEventListener("touchmove", (event) =>
        onCardTouchMove(event, setTouchPosition)
      );
    };
  }, []);

  return (
    <div
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
      onTouchStart={() => setIsHovered(true)}
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
