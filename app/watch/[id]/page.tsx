"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

// Game context + components — same as game/page.tsx
import {
  GameContext,
  GameEnd,
  EnemyMove,
  type GameContextType,
  type AnimationType,
} from "@/app/gameContext";
import { CardsContext } from "@/features/cardsManagement/CardsContext";
import { CardType } from "@/features/cardsManagement/types";
import { Enemy } from "@/utils/enemy";
import Character from "@/components/character/Character";
import { BottomUI } from "@/components/gameplay-ui/BottomUI";
import WinCard from "@/components/winCard/WinCard";
import EndGame from "@/components/endGame/EndGame";
import gameStyles from "@/app/game/style.module.css";
import watchStyles from "./style.module.css";

// ── Types ────────────────────────────────────────────────────
type WatchEnemy = Enemy; // full Enemy serialised to the lobby

type WatchState = {
  player: { hp: number; maxHp: number; name: string; image: string };
  enemy: WatchEnemy | null;
  gameEnd: number | null; // 0=WIN 1=LOSE 2=ENDGAME (GameEnd enum)
  log: string;
  hand: CardType[];
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
    playerAnimation: null as AnimationType,
    enemyAnimation: null as AnimationType,
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

  const gameEnd = state.gameEnd as GameEnd | null;

  return (
    <>
      {/* ── Exact same layout as game/page.tsx ── */}
      <WatchProviders state={state} lobbyId={id}>
        <div className={gameStyles["game-page"]}>
          {/* LOSE overlay */}
          {gameEnd === GameEnd.LOSE && (
            <div className={gameStyles["game-overlay"]}>
              <div className={gameStyles["game-overlay-content"]}>
                <h2 className={gameStyles["game-over-title"]}>💀 Hai perso!</h2>
                <button className={gameStyles["game-replay-btn"]}>
                  Riprova
                </button>
              </div>
            </div>
          )}

          {/* ENDGAME overlay — reuses the real EndGame component */}
          {gameEnd === GameEnd.ENDGAME && <EndGame />}

          {/* WIN overlay — reuses the real WinCard component */}
          {gameEnd === GameEnd.WIN && <WinCard />}

          {/* Arena */}
          <div className={gameStyles["game-arena"]}>
            <Character
              name={state.player.name}
              hp={state.player.hp}
              maxHp={state.player.maxHp}
              image={state.player.image}
              variant="player"
              animation={null}
            />
            {state.enemy && (
              <Character
                name={state.enemy.name}
                hp={state.enemy.hp}
                maxHp={state.enemy.maxHp}
                image={state.enemy.image}
                variant="monster"
                animation={null}
              />
            )}
          </div>

          {/* Log */}
          <div className={gameStyles["game-log"]}>{state.log}</div>
        </div>

        {/* Hand — reuses the real BottomUI */}
        <div className={gameStyles["hand-container"]}>
          <BottomUI />
        </div>
      </WatchProviders>

      {/* ── Transparent blocker — sits above everything, intercepts all input ── */}
      <div className={watchStyles.blocker} />

      {/* ── Watch badge — above the blocker ── */}
      <div className={watchStyles.watchBadge}>
        <span>👁 Lobby: {id}</span>
        {lastUpdate && (
          <span className={watchStyles.updateTime}>
            · {lastUpdate.toLocaleTimeString()}
          </span>
        )}
      </div>
    </>
  );
}
