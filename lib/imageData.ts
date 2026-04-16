export interface FaceImage {
  id: string;
  src: string;
  label: string;
  /** Fattore di zoom della faccia nel merge finale.
   *  1.0 = dimensione base (35% della larghezza del canvas).
   *  Es: 1.5 = 50% più grande, 0.8 = 20% più piccola.
   *  Default: 1.0
   */
  zoom?: number;
}

/** @deprecated use FaceImage */
export type OvalImage = FaceImage;

export interface MainImage {
  id: string;
  src: string;
  alt: string;
  /** URL dell'immagine con ritaglio (sfondo trasparente) in public/img/cut,
   *  da sovrapporre alla faccia selezionata per comporre l'immagine finale.
   */
  cutImageUrl: string;
  /** Ordine di rendering nel canvas rispetto alla faccia.
   *  "avanti": il cut viene disegnato sopra la faccia (faccia dietro).
   *  "dietro": il cut viene disegnato sotto la faccia (faccia avanti).
   *  Default: "avanti"
   */
  mainLayer?: "avanti" | "dietro";
  /** Fattore di zoom aggiuntivo applicato alla faccia per questa scena specifica.
   *  Viene moltiplicato al valore zoom della FaceImage.
   *  Es: 1.5 = faccia 50% più grande rispetto al suo zoom base.
   *  Default: 1.0 (nessun ingrandimento aggiuntivo)
   */
  faceZoomMultiplier?: number;
  /** Punto centrale dove verrà posizionata la faccia, in percentuale rispetto all'immagine.
   *  x: 0 = sinistra, 100 = destra
   *  y: 0 = alto, 100 = basso
   *  Default: { x: 50, y: 50 } (centro)
   */
  overlayAnchor?: { x: number; y: number };
}

export const OVAL_IMAGES: FaceImage[] = [
  { id: "face-1", src: "/img/faces/T1.5.png", label: "T1", zoom: 0.3 },
  { id: "face-2", src: "/img/faces/T2.5.png", label: "T2", zoom: 0.4 },
  { id: "face-3", src: "/img/faces/T3.png", label: "T3", zoom: 0.45 },
  { id: "face-4", src: "/img/faces/T4.5.png", label: "T4", zoom: 0.35 },
  { id: "face-5", src: "/img/faces/T5.5.png", label: "T5", zoom: 0.4 },
  { id: "face-6", src: "/img/faces/T6.png", label: "T6", zoom: 0.5 },
  { id: "face-7", src: "/img/faces/T7.png", label: "T7", zoom: 0.45 },
  { id: "face-8", src: "/img/faces/T8.5.png", label: "T8", zoom: 0.6 },
  { id: "face-9", src: "/img/faces/T9.png", label: "T9", zoom: 0.7 },
  { id: "face-10", src: "/img/faces/T9.5.png", label: "T9.5", zoom: 0.5 },
];

export const MAIN_IMAGES: MainImage[] = [
  {
    id: "main-1",
    src: "/img/raw/5983404169848622277.jpg",
    alt: "Scene 2",
    cutImageUrl: "/img/cut/B2.png",
    mainLayer: "avanti",
    overlayAnchor: { x: 50, y: 12 },
  },
  {
    id: "main-2",
    src: "/img/raw/5983404169848622278.jpg",
    alt: "Scene 3",
    cutImageUrl: "/img/cut/B1.png",
    mainLayer: "dietro",
    overlayAnchor: { x: 55, y: 15 },
  },
  {
    id: "main-3",
    src: "/img/raw/5983404169848622280.jpg",
    alt: "Scene 4",
    cutImageUrl: "/img/cut/B5.png",
    mainLayer: "dietro",
    overlayAnchor: { x: 55, y: 15 },
  },
  {
    id: "main-4",
    src: "/img/raw/5983404169848622284.jpg",
    alt: "Scene 6",
    cutImageUrl: "/img/cut/B6.png",
    mainLayer: "dietro",
    overlayAnchor: { x: 52, y: 10 },
  },
  {
    id: "main-5",
    src: "/img/raw/squiddy.png",
    alt: "Scene 5",
    cutImageUrl: "/img/raw/squiddy.png",
    mainLayer: "dietro",
    overlayAnchor: { x: 50, y: 15 },
    faceZoomMultiplier: 1.3,
  },
  {
    id: "main-6",
    src: "/img/raw/dog.png",
    alt: "Scene 7",
    cutImageUrl: "/img/raw/dog.png",
    mainLayer: "dietro",
    overlayAnchor: { x: 58, y: 15 },
    faceZoomMultiplier: 1.3,
  },
  {
    id: "main-7",
    src: "/img/raw/frog.png",
    alt: "Scene 8",
    cutImageUrl: "/img/raw/frog.png",
    mainLayer: "dietro",
    overlayAnchor: { x: 60, y: 15 },
    faceZoomMultiplier: 1.35,
  },
  /* {
    id: "main-5",
    src: "/img/raw/5983404169848622283.jpg",
    alt: "Scene 5",
    cutImageUrl: "/img/cut/B4.png",
    mainLayer: "avanti",
    overlayAnchor: { x: 48, y: 15 },
  }, */
];
