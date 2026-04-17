"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useImageComposer } from "@/hooks/useImageComposer";
import type { MainImage, OvalImage } from "@/lib/imageData";
import styles from "./style/CompositeModal.module.css";

interface Props {
  mainImage: MainImage;
  ovalImage: OvalImage;
  onClose: () => void;
}

export function CompositeModal({ mainImage, ovalImage, onClose }: Props) {
  const { compose } = useImageComposer();
  const [compositeUrl, setCompositeUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  // Composizione immagine al mount (e se cambiano i src)
  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);
    setCompositeUrl(null);

    compose(
      mainImage.cutImageUrl,
      ovalImage.src,
      mainImage.overlayAnchor,
      (ovalImage.zoom ?? 1.0) * (mainImage.faceZoomMultiplier ?? 1.0),
      (mainImage.mainLayer ?? "avanti") === "avanti",
    )
      .then((url) => {
        if (!cancelled) {
          setCompositeUrl(url);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError(
            "Impossibile comporre le immagini. Verifica i permessi CORS.",
          );
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [compose, mainImage.src, ovalImage.src]);

  // Chiudi con tasto Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === backdropRef.current) onClose();
    },
    [onClose],
  );

  const handleDownload = useCallback(() => {
    if (!compositeUrl) return;
    const a = document.createElement("a");
    a.href = compositeUrl;
    a.download = `composite_${mainImage.id}_${ovalImage.id}.png`;
    a.click();
  }, [compositeUrl, mainImage.id, ovalImage.id]);

  const handleStart = useCallback(() => {
    console.log("Start!");
  }, []);

  return (
    <div
      className={styles.backdrop}
      ref={backdropRef}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="Composizione immagine">
      <div className={styles.modal}>
        <header className={styles.header}>
          <div className={styles.actions}>
            <button className={styles.btnStart} onClick={handleStart}>
              Start!
            </button>
            <button
              className={styles.btnDownload}
              onClick={handleDownload}
              disabled={!compositeUrl}
              aria-disabled={!compositeUrl}>
              Download
            </button>
            <button
              className={styles.btnClose}
              onClick={onClose}
              aria-label="Chiudi modale">
              ✕
            </button>
          </div>
        </header>

        <div className={styles.body}>
          {isLoading && (
            <div className={styles.loadingWrapper}>
              <span className={styles.spinner} aria-hidden="true" />
              <p className={styles.statusText}>Composizione in corso…</p>
            </div>
          )}
          {error && <p className={styles.errorText}>{error}</p>}
          {compositeUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={compositeUrl}
              alt="Immagine composta"
              className={styles.compositeImage}
            />
          )}
        </div>
      </div>
    </div>
  );
}
