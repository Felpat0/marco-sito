import React, { useMemo, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import styles from "./EndGame.module.css";
import { ENEMY_POOL } from "@/utils/enemy";
import { useGame } from "@/app/gameContext";

const ANIM_CLASSES = [
  "anim-spin",
  "anim-pulse",
  "anim-driftLR",
  "anim-floatUD",
  "anim-wobble",
  "anim-orbit",
  "anim-wrapAround",
  "anim-shake",
] as const;

type AnimClass = (typeof ANIM_CLASSES)[number];

interface EnemyConfig {
  top: string;
  left: string;
  animClass: AnimClass;
  duration: number;
  delay: number;
}

function rnd(min: number, max: number) {
  return min + Math.random() * (max - min);
}

/**
 * Divides the screen into a grid of (cols × rows) cells and picks one cell
 * per enemy (shuffled), then places the image at a random spot inside that
 * cell. This guarantees even distribution regardless of pool size.
 */
function buildGridPositions(count: number): { top: string; left: string }[] {
  // Pick the grid dimensions that best fit the number of enemies
  const cols = Math.ceil(Math.sqrt(count));
  const rows = Math.ceil(count / cols);

  // Build one slot per cell, shuffle, then trim to count
  const cells: { col: number; row: number }[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      cells.push({ col: c, row: r });
    }
  }
  // Fisher-Yates shuffle
  for (let i = cells.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cells[i], cells[j]] = [cells[j], cells[i]];
  }

  // Usable area: keep images away from center-ish so they don't cover the title
  // Top: 3% – 85%, Left: 2% – 85%
  const topMin = 3;
  const topRange = 82;
  const leftMin = 2;
  const leftRange = 83;

  const cellH = topRange / rows;
  const cellW = leftRange / cols;
  // Padding inside each cell so images don't kiss each other
  const pad = 0.12;

  return cells.slice(0, count).map(({ col, row }) => ({
    top: `${topMin + row * cellH + rnd(cellH * pad, cellH * (1 - pad))}%`,
    left: `${leftMin + col * cellW + rnd(cellW * pad, cellW * (1 - pad))}%`,
  }));
}

/**
 * Arranges images evenly on an ellipse that adapts to the viewport,
 * using 82% of the width and 72% of the height as the two semi-axes.
 */
function buildCirclePositions(count: number): { top: string; left: string }[] {
  const imgSize = 110;
  const w = window.innerWidth;
  const h = window.innerHeight;
  const cx = w / 2;
  const cy = h / 2;
  // Semi-axes: wide on X to exploit horizontal space, shorter on Y
  const rx = w * 0.5 - imgSize / 2;
  const ry = h * 0.46 - imgSize / 2;
  return Array.from({ length: count }, (_, i) => {
    const angle = (2 * Math.PI * i) / count - Math.PI / 2;
    const x = cx + rx * Math.cos(angle) - imgSize / 2;
    const y = cy + ry * Math.sin(angle) - imgSize / 2;
    return {
      top: `${(y / h) * 100}%`,
      left: `${(x / w) * 100}%`,
    };
  });
}

export default function EndGame() {
  const router = useRouter();
  const [phase, setPhase] = useState<"chaos" | "circle" | "reward">("chaos");
  const [circlePos, setCirclePos] = useState<
    { top: string; left: string }[] | null
  >(null);

  // Computed once on mount — grid-distributed, fully scalable
  const configs = useMemo<EnemyConfig[]>(() => {
    const positions = buildGridPositions(ENEMY_POOL.length);
    // Shuffle animation classes so adjacent enemies rarely share the same one
    const shuffledAnims = [...ANIM_CLASSES].sort(() => Math.random() - 0.5);
    return ENEMY_POOL.map((_, i) => ({
      ...positions[i],
      animClass: shuffledAnims[i % shuffledAnims.length] as AnimClass,
      duration: rnd(2.2, 7.5),
      delay: rnd(0, 3),
    }));
  }, []);

  const handleContinua = useCallback(() => {
    setCirclePos(buildCirclePositions(ENEMY_POOL.length));
    setPhase("circle");
  }, []);

  const inCircle = phase === "circle" && circlePos !== null;

  return (
    <div className={styles["game-overlay"]}>
      {/* Animated enemy images */}
      <div className={styles["floating-enemies"]}>
        {ENEMY_POOL.map((enemy, i) => {
          const cfg = configs[i];
          const pos = inCircle
            ? circlePos![i]
            : { top: cfg.top, left: cfg.left };
          return (
            <img
              key={enemy.name}
              src={enemy.image}
              alt={enemy.name}
              className={`${styles["floating-enemy"]} ${
                inCircle ? styles["anim-none"] : styles[cfg.animClass]
              }`}
              style={{
                top: pos.top,
                left: pos.left,
                animationDuration: `${cfg.duration.toFixed(2)}s`,
              }}
            />
          );
        })}
      </div>

      <div className={styles["game-overlay-content"]}>
        {phase === "chaos" ? (
          <>
            <h2 className={styles["game-over-title"]}>
              🏆 Hai vinto! Hai sconfitto tutti i nemici!
            </h2>
            <button
              onClick={handleContinua}
              className={styles["game-replay-btn"]}
            >
              Continua
            </button>
          </>
        ) : phase === "circle" ? (
          <>
            <h2 className={styles["game-over-title"]}>
              Dai tuoi{" "}
              <span style={{ textDecoration: "line-through" }}>nemici</span>{" "}
              amici ancora
              <br />
              <span>CONGRATULAZIONI!</span>
            </h2>
            <button
              onClick={() => setPhase("reward")}
              className={styles["game-replay-btn"]}
            >
              Prendi la tua reward
            </button>
          </>
        ) : (
          <img
            src="/images/finale.png"
            alt="Reward finale"
            className={styles["reward-image"]}
          />
        )}
      </div>
    </div>
  );
}
