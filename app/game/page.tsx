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
