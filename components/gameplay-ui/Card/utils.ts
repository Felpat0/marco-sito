const CARDS_ROTATION = 5;
const CARDS_HEIGHT_OFFSET = 30;

export const onCardTouchMove = (
  event: TouchEvent,
  setPosition: React.Dispatch<
    React.SetStateAction<{ top: number; left: number }>
  >
) => {
  const touch = event?.touches[0];
  setPosition({ top: touch.clientY, left: touch.clientX });
};

export const getCardZIndex = (index: number, isHovered: boolean) => {
  if (isHovered) return 100; // Ensure hovered card is always on top
  return 100 - index; // Higher index means lower z-index
};

export const getCardRotation = (index: number, totalCards: number) => {
  const centerIndex = totalCards / 2 - 0.5;
  const offset = index - centerIndex;

  return CARDS_ROTATION * offset;
};

export const getCardHeightOffset = (index: number, totalCards: number) => {
  const centerIndex = totalCards / 2 - 0.5;
  const offset = Math.abs(index - centerIndex);

  return offset * CARDS_HEIGHT_OFFSET; // Adjust the multiplier for more or less height difference
};
