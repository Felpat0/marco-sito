"use client";

import { useState, useCallback, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { MainGrid } from "./MainGrid";
import { CompositeModal } from "./CompositeModal";
import { OVAL_IMAGES, MAIN_IMAGES } from "@/lib/imageData";
import type { OvalImage, MainImage } from "@/lib/imageData";
import styles from "./style/ComposePage.module.css";

interface ModalState {
  mainImage: MainImage;
  ovalImage: OvalImage;
}

export function ComposePage() {
  const [selectedOvalId, setSelectedOvalId] = useState<string | null>(null);
  const [selectedMainId, setSelectedMainId] = useState<string | null>(null);
  const [modalState, setModalState] = useState<ModalState | null>(null);

  // Quando entrambi sono selezionati, apre la modale e resetta le selezioni
  useEffect(() => {
    if (!selectedOvalId || !selectedMainId) return;
    const ovalImage = OVAL_IMAGES.find((o) => o.id === selectedOvalId);
    const mainImage = MAIN_IMAGES.find((m) => m.id === selectedMainId);
    if (!ovalImage || !mainImage) return;
    setModalState({ mainImage, ovalImage });
    setSelectedOvalId(null);
    setSelectedMainId(null);
  }, [selectedOvalId, selectedMainId]);

  const handleSelectOval = useCallback((id: string) => {
    setSelectedOvalId((prev) => (prev === id ? null : id));
  }, []);

  const handleSelectMain = useCallback((id: string) => {
    setSelectedMainId((prev) => (prev === id ? null : id));
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalState(null);
  }, []);

  return (
    <div className={styles.layout}>
      <Sidebar
        ovals={OVAL_IMAGES}
        selectedOvalId={selectedOvalId}
        onSelect={handleSelectOval}
      />
      <MainGrid
        images={MAIN_IMAGES}
        selectedMainId={selectedMainId}
        onSelect={handleSelectMain}
      />
      {modalState && (
        <CompositeModal
          mainImage={modalState.mainImage}
          ovalImage={modalState.ovalImage}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
