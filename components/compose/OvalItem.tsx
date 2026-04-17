"use client";

import type { FaceImage } from "@/lib/imageData";
import styles from "./style/OvalItem.module.css";

interface Props {
  oval: FaceImage;
  isSelected: boolean;
  onSelect: (ovalId: string) => void;
}

export function OvalItem({ oval, isSelected, onSelect }: Props) {
  return (
    <div
      className={`${styles.container} ${isSelected ? styles.selected : ""}`}
      onClick={() => onSelect(oval.id)}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      aria-label={`Seleziona ${oval.label}`}
      onKeyDown={(e) => e.key === "Enter" && onSelect(oval.id)}
    >
      <div className={styles.imageWrapper}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={oval.src}
          alt={oval.label}
          className={styles.image}
          draggable={false}
        />
      </div>
    </div>
  );
}
