"use client";

import { useEffect, useRef, useState } from "react";
import { GameEnd, useGame } from "../gameContext";
import styles from "./style.module.css";
import WinCard from "@/components/winCard/WinCard";
import { BottomUI } from "@/components/gameplay-ui/BottomUI";
import Character from "@/components/character/Character";
import EndGame from "@/components/endGame/EndGame";

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
    log,
    playerAnimation,
    enemyAnimation,
    setGameEnd,
    lobbyId,
    createLobby,
  } = useGame();

  useEffect(() => {
    startGame();
  }, []);

  return (
    <>
      <div className={styles["game-page"]}>
        <LobbyBar lobbyId={lobbyId} createLobby={createLobby} />
        <button
          onTouchStart={() => setGameEnd(GameEnd.ENDGAME)}
          onClick={() => setGameEnd(GameEnd.ENDGAME)}
          style={{ zIndex: 10000 }}
        >
          win game
        </button>
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

        {/* Log turno */}
        <div className={styles["game-log"]}>{log}</div>
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
    </>
  );
}

// ── Lobby sharing bar ──────────────────────────────────────────
function LobbyBar({
  lobbyId,
  createLobby,
}: {
  lobbyId: string | null;
  createLobby: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copyLink = () => {
    const url = `${window.location.origin}/watch/${lobbyId}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 2000);
    });
  };

  const barStyle: React.CSSProperties = {
    position: "relative",
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.4rem 0.75rem",
    background: "rgba(0,0,0,0.6)",
    borderRadius: "0.6rem",
    backdropFilter: "blur(4px)",
    fontSize: "0.8rem",
    color: "#fff",
    flexWrap: "wrap",
  };

  const btnStyle: React.CSSProperties = {
    padding: "0.3rem 0.7rem",
    background: "#eab308",
    color: "#000",
    fontWeight: 700,
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
    fontSize: "0.78rem",
  };

  if (!lobbyId) {
    return (
      <div style={barStyle}>
        <button style={btnStyle} onClick={createLobby}>
          👁 Condividi partita
        </button>
      </div>
    );
  }

  return (
    <div style={barStyle}>
      <span style={{ color: "#facc15", fontWeight: 700 }}>
        Lobby: {lobbyId}
      </span>
      <button style={btnStyle} onClick={copyLink}>
        {copied ? "✅ Copiato!" : "📋 Copia link"}
      </button>
    </div>
  );
}
