import { MainImageCard } from "./MainImageCard";
import type { MainImage } from "@/lib/imageData";
import styles from "./style/MainGrid.module.css";

interface Props {
  images: MainImage[];
  selectedMainId: string | null;
  onSelect: (imageId: string) => void;
}

export function MainGrid({ images, selectedMainId, onSelect }: Props) {
  return (
    <main className={styles.grid} aria-label="Main images grid">
      {images.map((image) => (
        <MainImageCard
          key={image.id}
          image={image}
          isSelected={selectedMainId === image.id}
          onSelect={onSelect}
        />
      ))}
    </main>
  );
}
