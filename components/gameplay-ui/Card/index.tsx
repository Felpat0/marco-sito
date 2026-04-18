"use client";
import { getStyleFromStructure } from "@/utils";
import { getCardStyles } from "./style";
import { useCallback, useEffect, useRef, useState } from "react";
import { onCardTouchMove } from "./utils";
import { CardType } from "@/features/cardsManagement/types";
import { RiShieldFill, RiSwordFill } from "react-icons/ri";
import { BiPlusMedical } from "react-icons/bi";

export type CardProps = CardType & {
  index?: number;
  cardsNumber?: number;
  isInReorderArea?: boolean;
  onStartDrag?: () => void;
  onRelease?: (event: TouchEvent) => void;
};

export const Card = ({
  index = 0,
  cardsNumber = 1,
  name,
  imageUrl,
  type,
  power,
  onStartDrag,
  onRelease,
}: CardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [touchPosition, setTouchPosition] = useState({ top: 0, left: 0 });
  const [initialPositionOffset, setInitialPositionOffset] = useState({
    top: 0,
    left: 0,
  });
  const [isInReorderArea, setIsInReorderArea] = useState(false);
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
      onStartDrag?.();
      const touchPosition = {
        y: event.touches[0].clientY,
        x: event.touches[0].clientX,
      };
      const cardOrigin = {
        x: cardContainerRef.current?.getBoundingClientRect().left || 0,
        y: cardContainerRef.current?.getBoundingClientRect().top || 0,
      };

      onCardTouchMove(event, setTouchPosition, setIsInReorderArea);
      setInitialPositionOffset({
        top: touchPosition.y - cardOrigin.y,
        left: touchPosition.x - cardOrigin.x,
      });
    },
    [touchPosition]
  );

  const handleTouchMove = useCallback(
    (event: TouchEvent) =>
      onCardTouchMove(event, setTouchPosition, setIsInReorderArea),
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

  const cardStyles = getCardStyles({
    index,
    cardsNumber,
    isHovered,
    touchPosition,
    initialPositionOffset,
    imageUrl,
    cardType: type,
    isInReorderArea,
  });
  return (
    <div
      ref={cardContainerRef}
      className="card"
      style={{
        ...getStyleFromStructure(cardStyles, "cardContainer", isHovered),
      }}
    >
      <div
        style={{ ...getStyleFromStructure(cardStyles, "cardPower", isHovered) }}
      >
        <div
          style={{
            ...getStyleFromStructure(
              cardStyles,
              "cardPowerIconContainer",
              isHovered
            ),
          }}
        >
          {type === "attack" && (
            <RiSwordFill color="red" stroke={"white"} strokeWidth={"1px"} />
          )}
          {type === "defend" && (
            <RiShieldFill
              color="#2563eb"
              style={{ paddingTop: ".5px" }}
              stroke={"white"}
              strokeWidth={"2px"}
            />
          )}
          {type === "heal" && (
            <BiPlusMedical color="green" stroke={"white"} strokeWidth={"1px"} />
          )}
        </div>
        <div
          style={{
            ...getStyleFromStructure(cardStyles, "cardPowerText", isHovered),
          }}
        >
          {power}
        </div>
      </div>
      <h3 style={getStyleFromStructure(cardStyles, "cardName", isHovered)}>
        {name}
      </h3>
      {/* <span className="type">{type}</span>
      <span className="power">{power}</span> */}
    </div>
  );
};
