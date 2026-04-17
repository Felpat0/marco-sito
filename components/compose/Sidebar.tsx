import { OvalItem } from "./OvalItem";
import type { FaceImage } from "@/lib/imageData";
import styles from "./style/Sidebar.module.css";

interface Props {
  ovals: FaceImage[];
  selectedOvalId: string | null;
  onSelect: (ovalId: string) => void;
}

export function Sidebar({ ovals, selectedOvalId, onSelect }: Props) {
  return (
    <aside className={styles.sidebar} aria-label="Sticker panel">
      <ul className={styles.list} role="list">
        {ovals.map((oval) => (
          <li key={oval.id}>
            <OvalItem
              oval={oval}
              isSelected={selectedOvalId === oval.id}
              onSelect={onSelect}
            />
          </li>
        ))}
      </ul>
    </aside>
  );
}
