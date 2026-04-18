"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { GameEnd, useGame } from "../gameContext";
import styles from "./style.module.css";
import WinCard from "@/components/winCard/WinCard";
import { BottomUI } from "@/components/gameplay-ui/BottomUI";
import Character from "@/components/character/Character";
import EndGame from "@/components/endGame/EndGame";
import { OrientationOverlay } from "@/components/OrientationOverlay/OrientationOverlay";

// - schermada finale con foto
// ------------------
// - girare il telefono
// - foto carte
// - foto mostri
// - boss finale
// - suoni

// ── Shared game board — reused as-is by the watch page ──────────────────────
export function GameBoard({ header }: { header?: ReactNode }) {
  const {
    player,
    enemy,
    startGame,
    gameEnd,
    log,
    playerAnimation,
    enemyAnimation,
  } = useGame();

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
      <OrientationOverlay />
    </>
  );
}

// ── Host-only game page ───────────────────────────────────────────────────────
export default function GamePage() {
  const { startGame, lobbyId, createLobby, setGameEnd } = useGame();

  useEffect(() => {
    startGame();
  }, []);

  return (
    <GameBoard
      header={
        <>
          <LobbyBar lobbyId={lobbyId} createLobby={createLobby} />
          <button
            onTouchStart={() => setGameEnd(GameEnd.ENDGAME)}
            onClick={() => setGameEnd(GameEnd.ENDGAME)}
            style={{ zIndex: 10000, position: "absolute", top: 10, right: 10 }}
          >
            win game
          </button>
        </>
      }
    />
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
  const [showQr, setShowQr] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const url = lobbyId
    ? `${typeof window !== "undefined" ? window.location.origin : ""}/watch/${lobbyId}`
    : "";

  const barStyle: React.CSSProperties = {
    position: "absolute",
    top: "0",
    left: "0",
    zIndex: 9999,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "0.4rem",
    padding: "0.4rem 0.75rem",
    background: "rgba(0,0,0,0.6)",
    borderRadius: "0.6rem",
    backdropFilter: "blur(4px)",
    fontSize: "0.8rem",
    color: "#fff",
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
          👁
        </button>
      </div>
    );
  }

  return (
    <div style={barStyle}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span style={{ color: "#facc15", fontWeight: 700 }}>{lobbyId}</span>
        <button style={btnStyle} onClick={() => setShowQr((v) => !v)}>
          {showQr ? "✖" : "QR"}
        </button>
      </div>
      {showQr && (
        <div
          style={{
            background: "#fff",
            padding: "0.4rem",
            borderRadius: "0.4rem",
          }}
        >
          <QRCodeSVG value={url} size={140} />
        </div>
      )}
    </div>
  );
}
