"use client";

import { useEffect } from "react";
import { GameEnd, useGame } from "../gameContext";
import "./style.css";

export default function GamePage() {
  const {
    player,
    enemy,
    nextEnemy,
    startGame,
    attack,
    defend,
    heal,
    isPlayerTurn,
    gameEnd,
    log,
  } = useGame();

  useEffect(() => {
    startGame();
  }, []);

  return (
    <div className="game-page">
      {gameEnd === GameEnd.LOSE && (
        <div className="game-overlay">
          <div className="game-overlay-content">
            <h2 className="game-over-title">💀 Hai perso!</h2>
            <button onClick={startGame} className="game-replay-btn">
              Riprova
            </button>
          </div>
        </div>
      )}
      {gameEnd === GameEnd.WIN && (
        <div className="game-overlay">
          <div className="game-overlay-content">
            <h2 className="game-over-title">🏆 Hai vinto!</h2>
            <button onClick={nextEnemy} className="game-replay-btn">
              Continua
            </button>
          </div>
        </div>
      )}
      {gameEnd === GameEnd.ENDGAME && (
        <div className="game-overlay">
          <div className="game-overlay-content">
            <h2 className="game-over-title">
              🏆 Hai vinto! Hai sconfitto tutti i nemici!
            </h2>
            <button onClick={startGame} className="game-replay-btn">
              Ricomincia
            </button>
          </div>
        </div>
      )}
      {/* Sezione personaggi */}
      <div className="game-arena">
        {/* Personaggio giocatore */}
        <div className="character">
          <span className="character-name">{player.name}</span>
          <div className="hp-bar-bg">
            <div
              className="hp-bar-fill hp-bar-fill--player"
              style={{ width: `${(player.hp / player.maxHp) * 100}%` }}
            />
          </div>
          <span className="hp-text hp-text--player">
            {player.hp} / {player.maxHp} HP
          </span>
          <img
            src={player.image}
            alt={player.name}
            className="character-img character-img--player"
          />
        </div>

        {/* Mostro avversario */}
        {enemy && (
          <div className="character">
            <span className="character-name">{enemy.name}</span>
            <div className="hp-bar-bg">
              <div
                className="hp-bar-fill hp-bar-fill--monster"
                style={{ width: `${(enemy.hp / enemy.maxHp) * 100}%` }}
              />
            </div>
            <span className="hp-text hp-text--monster">
              {enemy.hp} / {enemy.maxHp} HP
            </span>
            <img
              src={enemy.image}
              alt={enemy.name}
              className="character-img character-img--monster"
            />
          </div>
        )}
      </div>
      {/* Log turno */}
      <div className="game-log">{log}</div>
      {/* Bottoni azione */}
      <div className="game-actions">
        <button
          onClick={() => attack(100)}
          disabled={!isPlayerTurn || gameEnd !== null}
          className="btn btn-attack"
        >
          ⚔️ Attacca
        </button>
        <button
          onClick={() => defend(10)}
          disabled={!isPlayerTurn || gameEnd !== null}
          className="btn btn-defend"
        >
          🛡️ Difendi
        </button>
        <button
          onClick={() => heal(10)}
          disabled={!isPlayerTurn || gameEnd !== null}
          className="btn btn-heal"
        >
          💊 Cura
        </button>
      </div>
    </div>
  );
}
