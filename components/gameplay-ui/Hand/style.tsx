import { StyleStructure } from "@/types";
import { getCardStyles } from "../Card/style";

export const handStyles: StyleStructure = {
  handContainer: {
    base: {
      height: `${getCardStyles({}).cardContainer.base.height}`,
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: "0px",
      paddingTop: "70px",
      paddingBottom: "5px",
      backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
  },
};
