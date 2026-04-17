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

export interface MainImage {
  id: string;
  src: string;
  alt: string;
  name: string;
  /** URL dell'immagine con ritaglio (sfondo trasparente) in public/images/cut,
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
  {
    id: "face-1",
    src: "/images/faces/T1.5.png",
    label: "Er pazzo",
    zoom: 0.3,
  },
  { id: "face-2", src: "/images/faces/T2.5.png", label: "KissKiss", zoom: 0.4 },
  {
    id: "face-3",
    src: "/images/faces/T3.png",
    label: "Novabeh",
    zoom: 0.45,
  },
  {
    id: "face-4",
    src: "/images/faces/T4.5.png",
    label: "Spacciatore",
    zoom: 0.35,
  },
  {
    id: "face-5",
    src: "/images/faces/T5.5.png",
    label: "Er dannato",
    zoom: 0.4,
  },
  { id: "face-6", src: "/images/faces/T6.png", label: "Rav3", zoom: 0.5 },
  {
    id: "face-7",
    src: "/images/faces/T7.png",
    label: "DormiDormi",
    zoom: 0.45,
  },
  {
    id: "face-8",
    src: "/images/faces/T8.5.png",
    label: "O-O-Occhi di Ghiaccio",
    zoom: 0.6,
  },
  {
    id: "face-9",
    src: "/images/faces/T9.png",
    label: "Er dottore",
    zoom: 0.7,
  },
  {
    id: "face-10",
    src: "/images/faces/T9.5.png",
    label: "Er confuso",
    zoom: 0.5,
  },
];

export const MAIN_IMAGES: MainImage[] = [
  {
    id: "main-1",
    src: "/images/raw/5983404169848622277.jpg",
    alt: "Scene 1",
    name: "Di Marchio",
    cutImageUrl: "/images/cut/B2.png",
    mainLayer: "avanti",
    overlayAnchor: { x: 50, y: 12 },
  },
  {
    id: "main-2",
    src: "/images/raw/5983404169848622278.jpg",
    alt: "Scene 2",
    name: "The Mark",
    cutImageUrl: "/images/cut/B1.png",
    mainLayer: "dietro",
    overlayAnchor: { x: 55, y: 15 },
  },
  {
    id: "main-3",
    src: "/images/raw/5983404169848622280.jpg",
    alt: "Scene 3",
    name: "Il Gladiamarco",
    cutImageUrl: "/images/cut/B5.png",
    mainLayer: "dietro",
    overlayAnchor: { x: 55, y: 15 },
  },
  {
    id: "main-4",
    src: "/images/raw/5983404169848622284.jpg",
    alt: "Scene 4",
    name: "Marcoe",
    cutImageUrl: "/images/cut/B6.png",
    mainLayer: "dietro",
    overlayAnchor: { x: 52, y: 10 },
  },
  {
    id: "main-5",
    src: "/images/raw/squiddy.png",
    alt: "Scene 5",
    name: "Handsome Squidmark",
    cutImageUrl: "/images/cut/B8.png",
    mainLayer: "dietro",
    overlayAnchor: { x: 50, y: 15 },
    faceZoomMultiplier: 1.3,
  },
  {
    id: "main-6",
    src: "/images/raw/dog.png",
    alt: "Scene 6",
    name: "Mark Doge",
    cutImageUrl: "/images/cut/B9.png",
    mainLayer: "dietro",
    overlayAnchor: { x: 58, y: 15 },
    faceZoomMultiplier: 1.3,
  },
  {
    id: "main-7",
    src: "/images/raw/B07.png",
    alt: "Scene 7",
    name: "Jòmarco",
    cutImageUrl: "/images/cut/B7.png",
    mainLayer: "dietro",
    overlayAnchor: { x: 60, y: 10 },
    faceZoomMultiplier: 1,
  },
  /* {
    id: "main-5",
    src: "/images/raw/5983404169848622283.jpg",
    alt: "Scene 5",
    cutImageUrl: "/images/cut/B4.png",
    mainLayer: "avanti",
    overlayAnchor: { x: 48, y: 15 },
  }, */
];
