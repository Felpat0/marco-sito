"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import HpBar from "@/components/hpBar/HpBar";
import DamageAnimation from "./animations/DamageAnimation/DamageAnimation";
import HealAnimation from "./animations/HealAnimation/HealAnimation";
import DefendAnimation from "./animations/DefendAnimation/DefendAnimation";
import styles from "./Character.module.css";

type AnimationType = "damage" | "heal" | "defend" | null;

interface CharacterProps {
  name: string;
  hp: number;
  maxHp: number;
  image: string;
  variant: "player" | "monster";
  animation?: AnimationType;
}

const shakeVariants = {
  damage: {
    x: [-8, 8, -6, 6, -3, 3, 0],
    transition: { duration: 0.5, ease: "easeOut" },
  },
  idle: { x: 0 },
};

export default function Character({
  name,
  hp,
  maxHp,
  image,
  variant,
  animation = null,
}: CharacterProps) {
  return (
    <div className={styles["character"]}>
      <span className={styles["character-name"]}>{name}</span>
      <HpBar hp={hp} maxHp={maxHp} variant={variant} />
      <div className={styles["character-img-wrapper"]}>
        <motion.div
          animate={animation === "damage" ? "damage" : "idle"}
          variants={shakeVariants}
        >
          <img
            src={image}
            alt={name}
            className={`${styles["character-img"]} ${styles[`character-img--${variant}`]}`}
          />
        </motion.div>
        <AnimatePresence>
          {animation === "damage" && <DamageAnimation key="damage" />}
          {animation === "heal" && <HealAnimation key="heal" />}
          {animation === "defend" && <DefendAnimation key="defend" />}
        </AnimatePresence>
      </div>
    </div>
  );
}
