// Sostituisci i src con i path reali delle tue immagini, es: '/ovals/oval-1.png', '/mains/main-1.jpg'
// Le immagini locali vanno messe nella cartella /public/ del progetto Next.js
// Esempio: public/ovals/oval-1.png → src: '/ovals/oval-1.png'

export interface OvalImage {
  id: string;
  src: string;
  label: string;
}

export interface MainImage {
  id: string;
  src: string;
  alt: string;
  /** Punto centrale dove verrà posizionata la faccia ovale, in percentuale rispetto all'immagine.
   *  x: 0 = sinistra, 100 = destra
   *  y: 0 = alto, 100 = basso
   *  Default: { x: 50, y: 50 } (centro)
   */
  overlayAnchor?: { x: number; y: number };
}

export const OVAL_IMAGES: OvalImage[] = [
  {
    id: "oval-1",
    src: "https://picsum.photos/seed/ov6/200/200",
    label: "Sticker 1",
  },
  {
    id: "oval-2",
    src: "https://picsum.photos/seed/ov2/200/200",
    label: "Sticker 2",
  },
  {
    id: "oval-3",
    src: "https://picsum.photos/seed/ov3/200/200",
    label: "Sticker 3",
  },
  {
    id: "oval-4",
    src: "https://picsum.photos/seed/ov4/200/200",
    label: "Sticker 4",
  },
  {
    id: "oval-5",
    src: "https://picsum.photos/seed/ov5/200/200",
    label: "Sticker 5",
  },
];

export const MAIN_IMAGES: MainImage[] = [
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `main-${i + 1}`,
    src: `https://picsum.photos/seed/scene${i + 1}/600/400`,
    alt: `Scene ${i + 1}`,
    // overlayAnchor non specificato → usa il centro (50, 50)
    // Esempio con immagini reali:
    // overlayAnchor: { x: 35, y: 28 },  // faccia in alto a sinistra
  })),
  {
    id: `main-${11}`,
    src: `https://picsum.photos/seed/scene${11}/600/400`,
    alt: `Scene ${11}`,
    overlayAnchor: { x: 35, y: 28 },
  },
];
