import { useCallback, useEffect, useRef, useState } from "react";

export function useDragDrop(
  onDrop: (mainImageId: string, ovalId: string) => void,
) {
  const draggingOvalIdRef = useRef<string | null>(null);
  const ghostRef = useRef<HTMLDivElement | null>(null);
  const onDropRef = useRef(onDrop);
  const [hoveredDropId, setHoveredDropId] = useState<string | null>(null);

  // Aggiorna il ref ad ogni render senza re-registrare i listener
  useEffect(() => {
    onDropRef.current = onDrop;
  }, [onDrop]);

  const removeGhost = useCallback(() => {
    ghostRef.current?.remove();
    ghostRef.current = null;
  }, []);

  const startDrag = useCallback(
    (ovalId: string, src: string, clientX: number, clientY: number) => {
      draggingOvalIdRef.current = ovalId;

      const ghost = document.createElement("div");
      ghost.style.cssText = [
        "position:fixed",
        "width:64px",
        "height:76px",
        "border-radius:50% / 40%",
        "overflow:hidden",
        "pointer-events:none",
        "z-index:9999",
        "opacity:0.88",
        "box-shadow:0 4px 16px rgba(0,0,0,0.4)",
        `transform:translate(${clientX - 32}px,${clientY - 38}px)`,
        "will-change:transform",
      ].join(";");

      const img = document.createElement("img");
      img.src = src;
      img.style.cssText =
        "width:100%;height:100%;object-fit:cover;display:block;";
      ghost.appendChild(img);
      document.body.appendChild(ghost);
      ghostRef.current = ghost;
    },
    [],
  );

  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      if (!draggingOvalIdRef.current) return;
      // Previene lo scroll della pagina mentre si trascina
      e.preventDefault();
      if (ghostRef.current) {
        ghostRef.current.style.transform = `translate(${e.clientX - 32}px,${e.clientY - 38}px)`;
      }
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const target = el?.closest("[data-drop-id]");
      setHoveredDropId(target?.getAttribute("data-drop-id") ?? null);
    };

    const onPointerUp = (e: PointerEvent) => {
      const ovalId = draggingOvalIdRef.current;
      if (!ovalId) return;

      removeGhost();
      draggingOvalIdRef.current = null;
      setHoveredDropId(null);

      const el = document.elementFromPoint(e.clientX, e.clientY);
      const target = el?.closest("[data-drop-id]");
      if (target) {
        const imageId = target.getAttribute("data-drop-id");
        if (imageId) onDropRef.current(imageId, ovalId);
      }
    };

    const onPointerCancel = () => {
      removeGhost();
      draggingOvalIdRef.current = null;
      setHoveredDropId(null);
    };

    // passive: false è necessario per poter chiamare preventDefault in onPointerMove
    document.addEventListener("pointermove", onPointerMove, { passive: false });
    document.addEventListener("pointerup", onPointerUp);
    document.addEventListener("pointercancel", onPointerCancel);
    return () => {
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerup", onPointerUp);
      document.removeEventListener("pointercancel", onPointerCancel);
    };
  }, [removeGhost]);

  return { startDrag, hoveredDropId };
}
