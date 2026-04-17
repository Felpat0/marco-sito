"use client";
import React from "react";
import { motion } from "framer-motion";
import styles from "./HealAnimation.module.css";
import { useGame } from "@/app/gameContext";
import { BiPlusMedical } from "react-icons/bi";

const crosses = Array.from({ length: 6 });

export default function HealAnimation() {
  const { clearAnimations } = useGame();
  return (
    <>
      {/* Green pulsing aura */}
      <motion.div
        className={styles.aura}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: [0, 0.6, 0.3, 0.6, 0],
          scale: [0.8, 1.05, 1, 1.05, 0.9],
        }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
        onAnimationComplete={clearAnimations}
      />
      {/* 6 small green crosses floating up */}
      {crosses.map((_, i) => (
        <motion.span
          key={i}
          className={styles.cross}
          initial={{ opacity: 0, y: 20, x: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: [40, -40, -70, -90],
            x: (i % 2 === 0 ? 1 : -1) * (8 + i * 10),
          }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.8,
            delay: i * 0.08,
            ease: "easeOut",
          }}
          style={{ left: `${i * 20}%` }}
        >
          <BiPlusMedical
            style={{ width: "100%", height: "100%" }}
            size={"24px"}
            color="#3dff7e"
          />
        </motion.span>
      ))}
    </>
  );
}
