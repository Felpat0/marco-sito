"use client";

import { useOrientation } from "@/hooks/useOrientation";
import styles from "./OrientationOverlay.module.css";

interface Props {
  /** If provided, shows a "Continua" button that is enabled only in landscape */
  onContinue?: () => void;
}

export function OrientationOverlay({ onContinue }: Props) {
  const { isLandscape, isMobile } = useOrientation();

  return (
    <div className={styles.overlay} role="alertdialog" aria-modal="true">
      {isLandscape ? (
        <>
          <span className={styles.icon} aria-hidden="true">
            📱
          </span>
          <p className={styles.title}>Condividi la tua partita</p>
        </>
      ) : (
        <>
          <span className={styles.icon} aria-hidden="true">
            📱
          </span>
          <p className={styles.title}>Ruota il dispositivo</p>
          <p className={styles.subtitle}>
            Per continuare, metti il telefono in orizzontale.
          </p>
        </>
      )}
      {onContinue && (
        <>
          <button
            className={styles.btn}
            disabled={!isLandscape}
            aria-disabled={!isLandscape}
            onClick={onContinue}
          >
            Gioca
          </button>
        </>
      )}
    </div>
  );
}
