import type { MainImage } from "@/lib/imageData";
import styles from "./style/MainImageCard.module.css";

interface Props {
  image: MainImage;
  isSelected: boolean;
  onSelect: (imageId: string) => void;
}

export function MainImageCard({ image, isSelected, onSelect }: Props) {
  return (
    <div
      className={`${styles.card} ${isSelected ? styles.selected : ""}`}
      onClick={() => onSelect(image.id)}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      aria-label={`Seleziona ${image.alt}`}
      onKeyDown={(e) => e.key === "Enter" && onSelect(image.id)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image.src}
        alt={image.alt}
        className={styles.image}
        draggable={false}
      />
      {isSelected && (
        <div className={styles.selectedBadge} aria-hidden="true">
          ✓
        </div>
      )}
    </div>
  );
}
