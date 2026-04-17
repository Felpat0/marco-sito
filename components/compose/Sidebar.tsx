import { OvalItem } from "./OvalItem";
import type { OvalImage } from "@/lib/imageData";
import styles from "./style/Sidebar.module.css";

interface Props {
  ovals: OvalImage[];
  selectedOvalId: string | null;
  onSelect: (ovalId: string) => void;
}

export function Sidebar({ ovals, selectedOvalId, onSelect }: Props) {
  return (
    <aside className={styles.sidebar} aria-label="Sticker panel">
      <h2 className={styles.title}>Stickers</h2>
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
