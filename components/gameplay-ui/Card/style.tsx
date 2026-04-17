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
      marginBottom: `calc(-20px + ${getCardHeightOffset(index, cardsNumber)}px)`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      aspectRatio: "3 / 4",
      height: "30vh",
      zIndex: getCardZIndex(index, isHovered),
      transform: `rotate(${getCardRotation(index, cardsNumber)}deg) scale(1)`,
      transition: "transform 0.3s ease",
      backgroundImage: `url(${imageUrl})`,
    },
    hover: {
      position: "absolute",
      transform: `rotate(0deg) scale(2)`,
      transition: "transform 0.3s ease",
      zIndex: 100,
      top: touchPosition?.top - initialPositionOffset?.top,
      left: touchPosition?.left - initialPositionOffset?.left,
      marginTop: 0,
    },
  },
  cardName: {
    base: {
      fontSize: ".6rem",
      fontWeight: "bold",
      margin: 0,
      textAlign: "center",
      color: "#000",
      textShadow:
        "-.6px -.6px 0 #fff, .6px -.6px 0 #fff,-.6px .6px 0 #fff,.6px .6px 0 #fff",
    },
  },
  cardPower: {
    base: {
      position: "absolute",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      top: "5px",
      left: "5px",
    },
  },
  cardPowerText: {
    base: {
      fontSize: ".7rem",
      lineHeight: ".7rem",
      zIndex: 5,
      fontWeight: "bold",
      textAlign: "center",
      color: "#000",
      textShadow:
        "-.6px -.6px 0 #fff, .6px -.6px 0 #fff,-.6px .6px 0 #fff,.6px .6px 0 #fff",
    },
  },
  cardPowerIconContainer: {
    base: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "50%",
      width: "20px",
      height: "20px",
    },
  },
});
