"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Character, setupEnemyPool } from "../utils/enemy";

const GameContext = createContext<GameContextType | null>(null);

export enum GameEnd {
  WIN,
  LOSE,
  ENDGAME,
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

  const [enemies, setEnemies] = useState<Character[]>([]);

  const [gameEnd, setGameEnd] = useState<GameEnd | null>(null);
  const [log, setLog] = useState("⚔️ La battaglia è iniziata!");

  // Setup marco
  const setupPlayer = (image: string, name: string) => {
    setPlayer({ ...PLAYER_INIT, image, name });
  };

  // Turno del mostro
  const doMonsterTurn = (currentPlayerHp: number, defending?: number) => {
    setIsPlayerTurn(false);
    setTimeout(() => {
      const dmg = randomInt(8, 22); //TODO: da bilanciare
      const finalDmg = Math.max(0, dmg - (defending || 0));
      const newHp = Math.max(0, currentPlayerHp - finalDmg);

      setPlayer((p) => ({ ...p, hp: newHp }));

      if (newHp <= 0) {
        setGameEnd(GameEnd.LOSE);
        setLog("💀 Il nemico ti ha sconfitto!");
      } else {
        setIsPlayerTurn(true);
        setLog(
          defending
            ? `🛡️ Hai bloccato ${Math.min(defending, dmg)} danni!`
            : `👾 Il nemico ti attacca per ${dmg} danni!`,
        );
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
  };

  const startGame = () => {
    setPlayer(PLAYER_INIT);
    setEnemies(setupEnemyPool());
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
    doMonsterTurn(player.hp);
  };

  const defend = (value: number) => {
    if (!isPlayerTurn || gameEnd) return;
    setLog("🛡️ Ti metti in posizione difensiva...");
    doMonsterTurn(player.hp, value);
  };

  const heal = (value: number) => {
    if (!isPlayerTurn || gameEnd) return;

    const newHp = Math.min(player.maxHp, player.hp + value);
    setPlayer({ ...player, hp: newHp });

    const actual = newHp - player.hp;
    setLog(`💊 Recuperi ${actual} HP!`);

    doMonsterTurn(newHp);
  };

  return (
    <GameContext.Provider
      value={{
        player,
        enemy: enemies[0],
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
