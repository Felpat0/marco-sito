"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Character,
  Enemy,
  RANDOM_FACTOR,
  setupEnemyPool,
} from "../utils/enemy";
import { CardsContext } from "@/features/cardsManagement/CardsContext";

export const GameContext = createContext<GameContextType | null>(null);

export enum GameEnd {
  WIN,
  LOSE,
  ENDGAME,
}

export enum EnemyMove {
  ATTACK,
  DEFEND,
  HEAL,
  IDLE,
}

// Restituisce una mossa casuale tra ATTACK, DEFEND, HEAL, IDLE
export function getRandomEnemyMove(): EnemyMove {
  const moves = [
    EnemyMove.ATTACK,
    EnemyMove.DEFEND,
    EnemyMove.HEAL,
    EnemyMove.IDLE,
  ];
  const idx = Math.floor(Math.random() * moves.length);
  return moves[idx];
}

type AnimationType = "damage" | "heal" | "defend" | null;

export type { AnimationType };

export interface GameContextType {
  setGameEnd: React.Dispatch<React.SetStateAction<GameEnd | null>>;
  lobbyId: string | null;
  createLobby: () => void;
  player: Character;
  enemy: Enemy;
  nextEnemy: () => void;
  startGame: () => void;
  setupPlayer: (image: string, name: string) => void;
  attack: (value: number) => void;
  defend: (value: number) => void;
  heal: (value: number) => void;
  isPlayerTurn: boolean;
  gameEnd: GameEnd | null;
  enemyNextMove: EnemyMove;
  enemyNextMoveValue: number;
  playerAnimation: AnimationType;
  enemyAnimation: AnimationType;
  clearAnimations: () => void;
}

function calcMoveValue(move: EnemyMove, enemy: Enemy): number {
  switch (move) {
    case EnemyMove.ATTACK:
      return randomInt(
        Math.floor(enemy.attack * (1 - RANDOM_FACTOR)),
        Math.ceil(enemy.attack * (1 + RANDOM_FACTOR))
      );
    case EnemyMove.DEFEND:
      return randomInt(
        Math.floor(enemy.defense * (1 - RANDOM_FACTOR)),
        Math.ceil(enemy.defense * (1 + RANDOM_FACTOR))
      );
    case EnemyMove.HEAL:
      return randomInt(
        Math.floor(enemy.heal * (1 - RANDOM_FACTOR)),
        Math.ceil(enemy.heal * (1 + RANDOM_FACTOR))
      );
    default:
      return 0;
  }
}
//TODO: DA rimuovere e sostuituire con parte di chiara
export const PLAYER_INIT: Character = {
  hp: 100,
  maxHp: 100,
  name: "Marco SpallaRotta",
  image: "https://placehold.co/160x160/22c55e/fff?text=Hero",
};

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [player, setPlayer] = useState<Character>(PLAYER_INIT);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);

  const [enemies, setEnemies] = useState<Enemy[]>([]);

  const [gameEnd, setGameEnd] = useState<GameEnd | null>(null);

  const [enemyNextMove, setEnemyNextMove] = useState<EnemyMove>(EnemyMove.IDLE);
  const [enemyNextMoveValue, setEnemyNextMoveValue] = useState<number>(0);
  const [enemyDefenseValue, setEnemyDefenseValue] = useState<number>(0);

  const [playerAnimation, setPlayerAnimation] = useState<AnimationType>(null);
  const [enemyAnimation, setEnemyAnimation] = useState<AnimationType>(null);

  const [lobbyId, setLobbyId] = useState<string | null>(null);
  const pushTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { generateHand, hand } = useContext(CardsContext);

  const createLobby = () => {
    const id = Math.random().toString(36).slice(2, 8).toUpperCase();
    setLobbyId(id);
  };

  // Sync game state to lobby whenever something changes
  useEffect(() => {
    if (!lobbyId) return;
    if (pushTimer.current) clearTimeout(pushTimer.current);
    pushTimer.current = setTimeout(() => {
      fetch(`/api/lobby/${lobbyId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          player,
          enemy: enemies[0] ?? null,
          gameEnd,
          log,
          hand,
          playerAnimation,
          enemyAnimation,
          updatedAt: Date.now(),
        }),
      }).catch(() => {});
    }, 200);
  }, [player, enemies, gameEnd, log, hand, lobbyId]);

  const clearAnimations = () => {
    setPlayerAnimation(null);
    setEnemyAnimation(null);
  };

  // Setup marco
  const setupPlayer = (image: string, name: string) => {
    setPlayer({ ...PLAYER_INIT, image, name });
  };

  // Esegue la mossa scelta dal nemico
  const doEnemyAction = (currentPlayerHp: number, defending?: number) => {
    setIsPlayerTurn(false);
    setTimeout(() => {
      let newHp = currentPlayerHp;
      let logMsg = "";
      const enemy = enemies[0];
      if (!enemy) return;
      const val = enemyNextMoveValue;
      switch (enemyNextMove) {
        case EnemyMove.ATTACK: {
          const finalDmg = Math.max(0, val - (defending || 0));
          newHp = Math.max(0, currentPlayerHp - finalDmg);
          logMsg = defending
            ? `🛡️ Hai bloccato ${Math.min(defending, val)} danni!`
            : `👾 Il nemico ti attacca per ${val} danni!`;
          setPlayerAnimation("damage");
          break;
        }
        case EnemyMove.DEFEND: {
          logMsg = `🛡️ Il nemico si difende! (difesa ${val})`;
          setEnemyDefenseValue(val);
          setEnemyAnimation("defend");
          break;
        }
        case EnemyMove.HEAL: {
          setEnemies((prev) => {
            const arr = [...prev];
            arr[0] = {
              ...arr[0],
              hp: Math.min(arr[0].maxHp, arr[0].hp + val),
            };
            return arr;
          });
          logMsg = `💊 Il nemico si cura di ${val} HP!`;
          setEnemyAnimation("heal");
          break;
        }
        default:
          logMsg = "Il nemico non fa nulla.";
      }

      setPlayer((p) => ({ ...p, hp: newHp }));

      if (enemyNextMove !== EnemyMove.DEFEND) {
        setEnemyDefenseValue(0);
      }

      if (newHp <= 0) {
        setGameEnd(GameEnd.LOSE);
      } else {
        setIsPlayerTurn(true);
        const nextMove = getRandomEnemyMove();
        setEnemyNextMove(nextMove);
        setEnemyNextMoveValue(calcMoveValue(nextMove, enemy));
      }
    }, 1200);
  };

  // Gestione flusso di gioco
  const nextEnemy = () => {
    const enemiesTemp = [...enemies];
    enemiesTemp.shift();

    if (enemiesTemp.length === 0) {
      setGameEnd(GameEnd.ENDGAME);
      return;
    }
    generateHand();

    const nextMove = getRandomEnemyMove();
    setGameEnd(null);
    setEnemies(enemiesTemp);
    setEnemyNextMove(nextMove);
    setEnemyNextMoveValue(calcMoveValue(nextMove, enemiesTemp[0]));
  };

  const startGame = () => {
    // setPlayer(PLAYER_INIT);
    const pool = setupEnemyPool();
    const nextMove = getRandomEnemyMove();
    setEnemies(pool);
    setEnemyNextMove(nextMove);
    setEnemyNextMoveValue(calcMoveValue(nextMove, pool[0]));
    setGameEnd(null);
    generateHand();
  };

  // Azioni del giocatore
  const attack = (value: number) => {
    if (!isPlayerTurn || gameEnd) return;
    const blocked = enemyDefenseValue;
    const dmg = Math.max(0, value - blocked);
    const newMonsterHp = Math.max(0, enemies[0].hp - dmg);
    const newEnemies = [...enemies];
    newEnemies[0] = { ...newEnemies[0], hp: newMonsterHp };
    setEnemies(newEnemies);
    if (newMonsterHp <= 0) {
      setTimeout(() => {
        setGameEnd(GameEnd.WIN);
        return;
      }, 750);
    } else {
      const logMsg =
        blocked > 0
          ? `⚔️ Attacchi per ${value} danni, ma il nemico blocca ${blocked}! Danno effettivo: ${dmg}`
          : `⚔️ Attacchi per ${dmg} danni!`;
      setEnemyAnimation("damage");
      doEnemyAction(player.hp);
    }
  };

  const defend = (value: number) => {
    if (!isPlayerTurn || gameEnd) return;
    setPlayerAnimation("defend");
    doEnemyAction(player.hp, value);
  };

  const heal = (value: number) => {
    if (!isPlayerTurn || gameEnd) return;

    const newHp = Math.min(player.maxHp, player.hp + value);
    setPlayer({ ...player, hp: newHp });

    const actual = newHp - player.hp;
    setPlayerAnimation("heal");
    doEnemyAction(newHp);
  };

  return (
    <GameContext.Provider
      value={{
        setGameEnd,
        lobbyId,
        createLobby,
        player,
        enemy: enemies[0],
        enemyNextMove,
        enemyNextMoveValue,
        nextEnemy,
        startGame,
        setupPlayer,
        attack,
        defend,
        heal,
        isPlayerTurn,
        gameEnd,
        playerAnimation,
        enemyAnimation,
        clearAnimations,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame(): GameContextType {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within a GameProvider");
  return ctx;
}
