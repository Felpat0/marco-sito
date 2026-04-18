"use client";

import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useParams } from "next/navigation";

import {
  GameContext,
  GameEnd,
  EnemyMove,
  type GameContextType,
  type AnimationType,
} from "@/app/gameContext";
import { CardsContext } from "@/features/cardsManagement/CardsContext";
import { type CardType } from "@/features/cardsManagement/types";
import { type Enemy } from "@/utils/enemy";
import { GameBoard } from "@/app/game/page";
import watchStyles from "./style.module.css";

// ── Types ────────────────────────────────────────────────────
type WatchState = {
  player: { hp: number; maxHp: number; name: string; image: string };
  enemy: Enemy | null;
  gameEnd: number | null;
  log: string;
  hand: CardType[];
  playerAnimation: AnimationType;
  enemyAnimation: AnimationType;
  updatedAt: number;
};

const NOOP = () => {};
const POLL_MS = 3000;

const FALLBACK_ENEMY: Enemy = {
  hp: 0,
  maxHp: 0,
  attack: 0,
  defense: 0,
  heal: 0,
  name: "??",
  image: "",
  finalMessage: "",
};

// ── Fake providers ────────────────────────────────────────────
// Provide GameContext + CardsContext populated from lobby state so every
// child component (WinCard, BottomUI, EndGame, Character, …) works as-is.
function WatchProviders({
  state,
  lobbyId,
  children,
}: {
  state: WatchState;
  lobbyId: string;
  children: React.ReactNode;
}) {
  const gameValue: GameContextType = {
    setGameEnd: NOOP as GameContextType["setGameEnd"],
    lobbyId,
    createLobby: NOOP,
    player: state.player,
    enemy: state.enemy ?? FALLBACK_ENEMY,
    nextEnemy: NOOP,
    startGame: NOOP,
    setupPlayer: NOOP,
    attack: NOOP,
    defend: NOOP,
    heal: NOOP,
    isPlayerTurn: false,
    gameEnd: state.gameEnd as GameEnd | null,
    log: state.log,
    enemyNextMove: EnemyMove.IDLE,
    enemyNextMoveValue: 0,
    playerAnimation: state.playerAnimation ?? null,
    enemyAnimation: state.enemyAnimation ?? null,
    clearAnimations: NOOP,
  };

  const cardsValue = {
    deck: [],
    hand: state.hand ?? [],
    setDeck: NOOP,
    setHand: NOOP,
    drawCard: NOOP,
    playCard: NOOP,
    refreshDeck: NOOP,
    generateHand: NOOP,
  };

  return (
    <GameContext.Provider value={gameValue}>
      <CardsContext.Provider value={cardsValue}>
        {children}
      </CardsContext.Provider>
    </GameContext.Provider>
  );
}

// ── Page ─────────────────────────────────────────────────────
export default function WatchPage() {
  const { id } = useParams<{ id: string }>();
  const [state, setState] = useState<WatchState | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [showQr, setShowQr] = useState(false);

  useEffect(() => {
    let active = true;
    const poll = async () => {
      try {
        const res = await fetch(`/api/lobby/${id}`);
        if (!active) return;
        if (res.status === 404) {
          setNotFound(true);
          return;
        }
        const data: WatchState = await res.json();
        setState(data);
        setNotFound(false);
        setLastUpdate(new Date());
      } catch {
        /* keep last state on hiccup */
      }
    };
    poll();
    const iv = setInterval(poll, POLL_MS);
    return () => {
      active = false;
      clearInterval(iv);
    };
  }, [id]);

  if (notFound) {
    return (
      <div className={watchStyles.notFound}>
        Lobby <strong>{id}</strong> non trovata o partita non ancora iniziata.
      </div>
    );
  }
  if (!state) {
    return (
      <div className={watchStyles.loading}>Connessione alla lobby {id}…</div>
    );
  }

  return (
    <>
      <WatchProviders state={state} lobbyId={id}>
        {/* Exact same component the host sees — no modifications needed */}
        <GameBoard />
      </WatchProviders>

      {/* Transparent blocker: sits above everything, intercepts all input */}
      <div className={watchStyles.blocker} />

      {/* Watch badge: above the blocker */}
      <div className={watchStyles.watchBadge}>
        <span>👁 {id}</span>
        {lastUpdate && (
          <span className={watchStyles.updateTime}>
            · {lastUpdate.toLocaleTimeString()}
          </span>
        )}
        <button
          className={watchStyles.qrBtn}
          onClick={() => setShowQr((v) => !v)}
        >
          {showQr ? "✖" : "QR"}
        </button>
        {showQr && (
          <div className={watchStyles.qrPanel}>
            <QRCodeSVG
              value={`${window.location.origin}/watch/${id}`}
              size={140}
            />
          </div>
        )}
      </div>
    </>
  );
}
