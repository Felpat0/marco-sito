import { StyleStructure } from "@/types";
import { cardStyles } from "../Card/style";

export const handStyles: StyleStructure = {
  handContainer: {
    base: {
      height: cardStyles.cardContainer.base.height,
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: "16px",
      padding: "16px",
    },
  },
};
