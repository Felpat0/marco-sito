import { StyleStructure } from "@/types";

export const cardStyles: StyleStructure = {
  cardContainer: {
    base: {
      userSelect: "none",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      border: "1px solid #ccc",
      borderRadius: "8px",
      padding: "16px",
      backgroundSize: "cover",
      backgroundPosition: "center",
      aspectRatio: "3 / 4",
      height: "30vh",
      transform: "scale(1)",
      transition: "transform 0.3s ease",
    },
    hover: {
      position: "absolute",
      transform: "scale(1.2)",
      transition: "transform 0.3s ease",
      zIndex: 10,
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
};
