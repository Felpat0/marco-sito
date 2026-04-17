"use client";
import React from "react";
import { motion } from "framer-motion";
import styles from "./DamageAnimation.module.css";
import { useGame } from "@/app/gameContext";

export default function DamageAnimation() {
  const { clearAnimations } = useGame();
  return (
    <>
      {/* Red slash across the image */}
      <motion.div
        className={styles.slash}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: [0, 1, 1, 0] }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        onAnimationComplete={clearAnimations}
      />
      {/* Shake overlay on the whole character */}
      <motion.div
        className={styles.shakeOverlay}
        initial={{ x: 0 }}
        animate={{ x: [-8, 8, -6, 6, -3, 3, 0] }}
        exit={{ x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </>
  );
}
