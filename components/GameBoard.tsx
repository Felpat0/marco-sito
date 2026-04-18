"use client";

import { type ReactNode } from "react";
import { GameEnd, useGame } from "@/app/gameContext";
import styles from "@/app/game/style.module.css";
import WinCard from "@/components/winCard/WinCard";
import { BottomUI } from "@/components/gameplay-ui/BottomUI";
import Character from "@/components/character/Character";
import EndGame from "@/components/endGame/EndGame";
import { OrientationOverlay } from "@/components/OrientationOverlay/OrientationOverlay";
import { useOrientation } from "@/hooks/useOrientation";

export function GameBoard({ header }: { header?: ReactNode }) {
  const { player, enemy, startGame, gameEnd, playerAnimation, enemyAnimation } =
    useGame();
  const { isLandscape } = useOrientation();

  return (
    <>
      <div className={styles["game-page"]}>
        {header}
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
        <div className={styles["game-arena"]}>
          <Character
            name={player.name}
            hp={player.hp}
            maxHp={player.maxHp}
            image={player.image}
            variant="player"
            animation={playerAnimation}
          />
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
      </div>
      <div className={styles["hand-container"]}>
        <BottomUI />
      </div>
      {!isLandscape && <OrientationOverlay />}
    </>
  );
}
