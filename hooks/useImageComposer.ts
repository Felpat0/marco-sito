import { useCallback } from "react";

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    // crossOrigin='anonymous' è necessario per canvas con immagini remote (es. picsum.photos)
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}

export function useImageComposer() {
  const compose = useCallback(
    async (
      mainSrc: string,
      ovalSrc: string,
      anchor: { x: number; y: number } = { x: 50, y: 50 },
    ): Promise<string> => {
      const [mainImg, ovalImg] = await Promise.all([
        loadImage(mainSrc),
        loadImage(ovalSrc),
      ]);

      const canvas = document.createElement("canvas");
      canvas.width = mainImg.naturalWidth;
      canvas.height = mainImg.naturalHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas 2D context not available");

      // 1. Disegna l'immagine base
      ctx.drawImage(mainImg, 0, 0);

      // 2. Centro dell'ovale calcolato dall'anchor (percentuali → pixel)
      const cx = canvas.width * (anchor.x / 100);
      const cy = canvas.height * (anchor.y / 100);

      // larghezza = 35% del canvas, altezza = 120% della larghezza (forma ovale)
      const ovalW = canvas.width * 0.35;
      const ovalH = ovalW * 1.2;

      ctx.save();
      ctx.beginPath();
      ctx.ellipse(cx, cy, ovalW / 2, ovalH / 2, 0, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(ovalImg, cx - ovalW / 2, cy - ovalH / 2, ovalW, ovalH);
      ctx.restore();

      return canvas.toDataURL("image/png");
    },
    [],
  );

  return { compose };
}
