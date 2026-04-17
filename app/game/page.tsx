"use client";

import { useEffect } from "react";
import { GameEnd, useGame } from "../gameContext";
import styles from "./style.module.css";
import WinCard from "@/components/winCard/WinCard";
import Character from "@/components/character/Character";

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
    playerAnimation,
    enemyAnimation,
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
        <Character
          name={player.name}
          hp={player.hp}
          maxHp={player.maxHp}
          image={player.image}
          variant="player"
          animation={playerAnimation}
        />

        {/* Mostro avversario */}
        {enemy && (
          <Character
            name={enemy.name}
            hp={enemy.hp}
            maxHp={enemy.maxHp}
            image={enemy.image}
            variant="monster"
            animation={enemyAnimation}
          />
        )}
      </div>
      {/* Log turno */}
      <div className={styles["game-log"]}>{log}</div>
      {/* Bottoni azione */}
      <div className={styles["game-actions"]}>
        <button
          onClick={() => attack(1000)}
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
