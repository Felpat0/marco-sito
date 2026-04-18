"use client";

import { useEffect, useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { GameEnd, useGame } from "../gameContext";
import { GameBoard } from "@/components/GameBoard";
import { LobbyBar } from "@/components/LobbyBar";

// - schermada finale con foto
// ------------------
// - foto carte
// - foto mostri
// - boss finale
// - suoni

// ── Host-only game page ───────────────────────────────────────────────────────
export default function GamePage() {
  const { startGame, setGameEnd, lobbyId, createLobby } = useGame();
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    startGame();
  }, []);

  const handleHoldStart = () => {
    holdTimer.current = setTimeout(() => {
      setGameEnd(GameEnd.WIN);
    }, 3000);
  };

  const handleHoldEnd = () => {
    if (holdTimer.current) {
      clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }
  };

  return (
    <GameBoard
      header={
        <>
          <LobbyBar lobbyId={lobbyId} createLobby={createLobby} />
          <button
            onMouseDown={handleHoldStart}
            onMouseUp={handleHoldEnd}
            onMouseLeave={handleHoldEnd}
            onTouchStart={handleHoldStart}
            onTouchEnd={handleHoldEnd}
            style={{
              zIndex: 50,
              position: "absolute",
              top: 10,
              right: 10,
              width: 44,
              height: 44,
              opacity: 0,
              cursor: "default",
              background: "transparent",
              border: "none",
            }}
          />
        </>
      }
    />
  );
}
