"use client";

import { useEffect } from "react";
import { GameEnd, useGame } from "../gameContext";
import styles from "./style.module.css";
import WinCard from "@/components/winCard/WinCard";
import HpBar from "@/components/hpBar/HpBar";

export default function GamePage() {
  const {
    player,
    enemy,
    startGame,
    attack,
    defend,
    heal,
    isPlayerTurn,
    gameEnd,
    log,
  } = useGame();

  useEffect(() => {
    startGame();
  }, []);

  return (
    <div className={styles["game-page"]}>
      {gameEnd === GameEnd.LOSE && (
        <div className={styles["game-overlay"]}>
          <div className={styles["game-overlay-content"]}>
            <h2 className={styles["game-over-title"]}>💀 Hai perso!</h2>
            <button onClick={startGame} className={styles["game-replay-btn"]}>
              Riprova
            </button>
          </div>
        </div>
      )}
      {gameEnd === GameEnd.WIN && <WinCard />}
      {gameEnd === GameEnd.ENDGAME && (
        <div className={styles["game-overlay"]}>
          <div className={styles["game-overlay-content"]}>
            <h2 className={styles["game-over-title"]}>
              🏆 Hai vinto! Hai sconfitto tutti i nemici!
            </h2>
            <button onClick={startGame} className={styles["game-replay-btn"]}>
              Ricomincia
            </button>
          </div>
        </div>
      )}
      {/* Sezione personaggi */}
      <div className={styles["game-arena"]}>
        {/* Personaggio giocatore */}
        <div className={styles["character"]}>
          <span className={styles["character-name"]}>{player.name}</span>
          <HpBar hp={player.hp} maxHp={player.maxHp} variant="player" />
          <img
            src={player.image}
            alt={player.name}
            className={`${styles["character-img"]} ${styles["character-img--player"]}`}
          />
        </div>

        {/* Mostro avversario */}
        {enemy && (
          <div className={styles["character"]}>
            <span className={styles["character-name"]}>{enemy.name}</span>
            <HpBar hp={enemy.hp} maxHp={enemy.maxHp} variant="monster" />
            <img
              src={enemy.image}
              alt={enemy.name}
              className={`${styles["character-img"]} ${styles["character-img--monster"]}`}
            />
          </div>
        )}
      </div>
      {/* Log turno */}
      <div className={styles["game-log"]}>{log}</div>
      {/* Bottoni azione */}
      <div className={styles["game-actions"]}>
        <button
          onClick={() => attack(10)}
          disabled={!isPlayerTurn || gameEnd !== null}
          className={`${styles["btn"]} ${styles["btn-attack"]}`}
        >
          ⚔️ Attacca
        </button>
        <button
          onClick={() => defend(10)}
          disabled={!isPlayerTurn || gameEnd !== null}
          className={`${styles["btn"]} ${styles["btn-defend"]}`}
        >
          🛡️ Difendi
        </button>
        <button
          onClick={() => heal(10)}
          disabled={!isPlayerTurn || gameEnd !== null}
          className={`${styles["btn"]} ${styles["btn-heal"]}`}
        >
          💊 Cura
        </button>
      </div>
    </div>
  );
}
