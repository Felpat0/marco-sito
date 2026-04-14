import { StyleStructure } from "@/types";

export const getStyleFromStructure = (
  styleStructure: StyleStructure,
  elementKey: string,
  isHovered: boolean = false
): React.CSSProperties => {
  const elementStyles = styleStructure[elementKey];
  if (!elementStyles) {
    console.warn(`No styles found for element key: ${elementKey}`);
    return {};
  }

  const baseStyles = elementStyles.base || {};
  const hoverStyles =
    isHovered && elementStyles.hover ? elementStyles.hover : {};
  return { ...baseStyles, ...hoverStyles };
};
