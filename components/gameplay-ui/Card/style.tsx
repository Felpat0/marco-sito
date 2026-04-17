import { StyleStructure } from "@/types";
import { getCardHeightOffset, getCardRotation, getCardZIndex } from "./utils";

type CardStylesArguments = {
  index?: number;
  cardsNumber?: number;
  isHovered?: boolean;
  touchPosition?: { top: number; left: number };
  initialPositionOffset?: { top: number; left: number };
  imageUrl?: string;
};

export const getCardStyles: (args: CardStylesArguments) => StyleStructure = ({
  index = 0,
  cardsNumber = 1,
  isHovered = false,
  touchPosition = { top: 0, left: 0 },
  initialPositionOffset = { top: 0, left: 0 },
  imageUrl = "",
}) => ({
  cardContainer: {
    base: {
      userSelect: "none",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      border: "1px solid #ccc",
      borderRadius: "8px",
      padding: "16px",
      marginTop: getCardHeightOffset(index, cardsNumber),
      backgroundSize: "cover",
      backgroundPosition: "center",
      aspectRatio: "3 / 4",
      height: "30vh",
      zIndex: getCardZIndex(index, isHovered),
      transform: `rotate(${getCardRotation(index, cardsNumber)}deg) scale(1)`,
      transition: "transform 0.3s ease",
      backgroundImage: `url(${imageUrl})`,
      ...(isHovered
        ? {
            top: touchPosition?.top - initialPositionOffset?.top,
            left: touchPosition?.left - initialPositionOffset?.left,
          }
        : {}),
    },
    hover: {
      position: "absolute",
      transform: `rotate(0deg) scale(1.5)`,
      transition: "transform 0.3s ease",
      zIndex: 100,
    },
  },
  cardName: {
    base: {
      fontSize: "1rem",
      fontWeight: "bold",
      textAlign: "start",
      color: "#000",
      textShadow:
        "-1px -1px 0 #fff, 1px -1px 0 #fff,-1px 1px 0 #fff,1px 1px 0 #fff",
    },
  },
});
