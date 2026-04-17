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
      zoom: number = 1.0,
      mainInFront: boolean = true,
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

      // 2. Centro della faccia calcolato dall'anchor (percentuali → pixel)
      const cx = canvas.width * (anchor.x / 100);
      const cy = canvas.height * (anchor.y / 100);

      // larghezza = 35% del canvas * zoom, altezza proporzionale al ratio naturale dell'immagine
      const faceW = ovalImg.naturalWidth * zoom;
      const faceH = faceW * (ovalImg.naturalHeight / ovalImg.naturalWidth);

      if (mainInFront) {
        // faccia dietro, cut davanti
        ctx.drawImage(ovalImg, cx - faceW / 2, cy - faceH / 2, faceW, faceH);
        ctx.drawImage(mainImg, 0, 0);
      } else {
        // cut dietro, faccia davanti
        ctx.drawImage(mainImg, 0, 0);
        ctx.drawImage(ovalImg, cx - faceW / 2, cy - faceH / 2, faceW, faceH);
      }

      return canvas.toDataURL("image/png");
    },
    [],
  );

  return { compose };
}
