"use client";

import { useEffect } from "react";
import { GameEnd, useGame } from "../gameContext";
import styles from "./style.module.css";
import WinCard from "@/components/winCard/WinCard";
import { BottomUI } from "@/components/gameplay-ui/BottomUI";
import Character from "@/components/character/Character";
import EndGame from "@/components/endGame/EndGame";
import { OrientationOverlay } from "@/components/OrientationOverlay/OrientationOverlay";
import { useOrientation } from "@/hooks/useOrientation";

// - schermada finale con foto
// ------------------
// - foto carte
// - foto mostri
// - boss finale
// - suoni

export default function GamePage() {
  const {
    player,
    enemy,
    startGame,
    gameEnd,
    playerAnimation,
    enemyAnimation,
    setGameEnd,
  } = useGame();
  const { isLandscape } = useOrientation();

  useEffect(() => {
    startGame();
  }, []);

  return (
    <>
      <div className={styles["game-page"]}>
        <div style={{ position: "absolute", zIndex: 1000 }}>
          <button
            onTouchStart={() => setGameEnd(GameEnd.ENDGAME)}
            onClick={() => setGameEnd(GameEnd.ENDGAME)}
          >
            win game
          </button>
          <button
            onTouchStart={() => setGameEnd(GameEnd.WIN)}
            onClick={() => setGameEnd(GameEnd.WIN)}
          >
            win fight
          </button>
        </div>
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
        {gameEnd === GameEnd.ENDGAME && <EndGame />}
        {gameEnd === GameEnd.WIN && <WinCard />}
        {/* <EndGame /> */}
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
        {/* Bottoni azione */}
        {/* <div className={styles["game-actions"]}>
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
      </div> */}
      </div>
      <div className={styles["hand-container"]}>
        <BottomUI />
      </div>
      {!isLandscape && <OrientationOverlay />}
    </>
  );
}
