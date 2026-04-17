import { useGame } from "@/app/gameContext";
import React from "react";
import styles from "./winCard.module.css";
import { RiSwordFill } from "react-icons/ri";

export default function WinCard() {
  const { nextEnemy, enemy } = useGame();
  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <button onClick={nextEnemy} className={styles.continueBtn}>
          Continua <RiSwordFill />
        </button>
        <div className={styles.contentMessage}>
          <div className={styles.messageContent}>
            <p className={styles.message}>
              <p className={styles.name}>{enemy.name}</p>
              {enemy.finalMessage} <div className={styles.messageArrow}></div>
            </p>
          </div>
          <img src={enemy.image} alt={enemy.name} className={styles.image} />
        </div>
      </div>
    </div>
  );
}
