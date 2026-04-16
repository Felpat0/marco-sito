"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  Character,
  Enemy,
  RANDOM_FACTOR,
  setupEnemyPool,
} from "../utils/enemy";

const GameContext = createContext<GameContextType | null>(null);

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

interface GameContextType {
  player: Character;
  enemy: Character;
  nextEnemy: () => void;
  startGame: () => void;
  setupPlayer: (image: string, name: string) => void;
  attack: (value: number) => void;
  defend: (value: number) => void;
  heal: (value: number) => void;
  isPlayerTurn: boolean;
  gameEnd: GameEnd | null;
  log: string;
  enemyNextMove: EnemyMove;
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
  const [log, setLog] = useState("⚔️ La battaglia è iniziata!");

  const [enemyNextMove, setEnemyNextMove] = useState<EnemyMove>(EnemyMove.IDLE);

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
      let healed = 0;
      const enemy = enemies[0];
      if (!enemy) return;
      switch (enemyNextMove) {
        case EnemyMove.ATTACK: {
          const min = Math.floor(enemy.attack * (1 - RANDOM_FACTOR));
          const max = Math.ceil(enemy.attack * (1 + RANDOM_FACTOR));
          const dmg = randomInt(min, max);
          const finalDmg = Math.max(0, dmg - (defending || 0));
          newHp = Math.max(0, currentPlayerHp - finalDmg);
          logMsg = defending
            ? `🛡️ Hai bloccato ${Math.min(defending, dmg)} danni!`
            : `👾 Il nemico ti attacca per ${dmg} danni!`;
          break;
        }
        case EnemyMove.DEFEND: {
          const min = Math.floor(enemy.defense * (1 - RANDOM_FACTOR));
          const max = Math.ceil(enemy.defense * (1 + RANDOM_FACTOR));
          const def = randomInt(min, max);
          logMsg = `🛡️ Il nemico si difende! (difesa ${def})`;
          break;
        }
        case EnemyMove.HEAL: {
          const min = Math.floor(enemy.heal * (1 - RANDOM_FACTOR));
          const max = Math.ceil(enemy.heal * (1 + RANDOM_FACTOR));
          healed = randomInt(min, max);
          setEnemies((prev) => {
            const arr = [...prev];
            arr[0] = {
              ...arr[0],
              hp: Math.min(arr[0].maxHp, arr[0].hp + healed),
            };
            return arr;
          });
          logMsg = `💊 Il nemico si cura di ${healed} HP!`;
          break;
        }
        default:
          logMsg = "Il nemico non fa nulla.";
      }

      setPlayer((p) => ({ ...p, hp: newHp }));

      if (newHp <= 0) {
        setGameEnd(GameEnd.LOSE);
        setLog("💀 Il nemico ti ha sconfitto!");
      } else {
        setIsPlayerTurn(true);
        setEnemyNextMove(getRandomEnemyMove());
        setLog(logMsg);
      }
    }, 1200);
  };

  // Gestione flusso di gioco
  const nextEnemy = () => {
    const enemiesTemp = [...enemies];
    enemiesTemp.shift();

    if (enemiesTemp.length === 0) {
      setGameEnd(GameEnd.ENDGAME);
      setLog("🏆 Hai sconfitto tutti i nemici! Vittoria totale!");
      return;
    }

    setGameEnd(null);
    setEnemies(enemiesTemp);
    setEnemyNextMove(getRandomEnemyMove());
  };

  const startGame = () => {
    setPlayer(PLAYER_INIT);

    setEnemies(setupEnemyPool());
    setEnemyNextMove(getRandomEnemyMove());

    setGameEnd(null);
    setLog("⚔️ La battaglia è iniziata!");
  };

  // Azioni del giocatore
  const attack = (value: number) => {
    if (!isPlayerTurn || gameEnd) return;
    const dmg = value;
    const newMonsterHp = Math.max(0, enemies[0].hp - dmg);
    const newEnemies = [...enemies];
    newEnemies[0] = { ...newEnemies[0], hp: newMonsterHp };
    setEnemies(newEnemies);
    if (newMonsterHp <= 0) {
      setGameEnd(GameEnd.WIN);
      setLog(`⚔️ Colpo finale per ${dmg} danni! Hai vinto!`);
      return;
    }
    setLog(`⚔️ Attacchi per ${dmg} danni!`);
    doEnemyAction(player.hp);
  };

  const defend = (value: number) => {
    if (!isPlayerTurn || gameEnd) return;
    setLog("🛡️ Ti metti in posizione difensiva...");
    doEnemyAction(player.hp, value);
  };

  const heal = (value: number) => {
    if (!isPlayerTurn || gameEnd) return;

    const newHp = Math.min(player.maxHp, player.hp + value);
    setPlayer({ ...player, hp: newHp });

    const actual = newHp - player.hp;
    setLog(`💊 Recuperi ${actual} HP!`);

    doEnemyAction(newHp);
  };

  return (
    <GameContext.Provider
      value={{
        player,
        enemy: enemies[0],
        enemyNextMove,
        nextEnemy,
        startGame,
        setupPlayer,
        attack,
        defend,
        heal,
        isPlayerTurn,
        gameEnd,
        log,
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
