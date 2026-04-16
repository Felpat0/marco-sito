export const onCardTouchMove = (
  event: TouchEvent,
  setPosition: React.Dispatch<
    React.SetStateAction<{ top: number; left: number }>
  >
) => {
  const touch = event?.touches[0];
  setPosition({ top: touch.clientY, left: touch.clientX });
};
