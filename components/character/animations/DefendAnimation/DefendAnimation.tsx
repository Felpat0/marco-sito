"use client";
import React from "react";
import { motion } from "framer-motion";
import styles from "./DefendAnimation.module.css";
import { useGame } from "@/app/gameContext";
import { RiShieldFill } from "react-icons/ri";

interface Props {
  onComplete?: () => void;
}

export default function DefendAnimation({ onComplete }: Props) {
  const { clearAnimations } = useGame();
  return (
    <>
      {/* Grey defensive aura — primary element */}
      <motion.div
        className={styles.aura}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{
          opacity: [0, 0.5, 0.35, 0.5, 0],
          scale: [0.85, 1.05, 1, 1.05, 0.9],
        }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        onAnimationComplete={clearAnimations}
      />
      {/* Shield icon appear and disappear */}
      <motion.div
        className={styles.shield}
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: [0, 1, 1, 0], scale: [0.3, 1.1, 1, 0.8] }}
        exit={{ opacity: 0, scale: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <RiShieldFill style={{ width: "80%", height: "80%" }} color="#2563eb" />
      </motion.div>
    </>
  );
}
