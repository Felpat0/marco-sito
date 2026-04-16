import { EnemyMove, useGame } from "@/app/gameContext";
import styles from "./hpBar.module.css";

interface HpBarProps {
  hp: number;
  maxHp: number;
  variant: "player" | "monster";
}

const MOVE_LABEL: Record<EnemyMove, string> = {
  [EnemyMove.ATTACK]: "⚔️ Attacco",
  [EnemyMove.DEFEND]: "🛡️ Difesa",
  [EnemyMove.HEAL]: "💊 Cura",
  [EnemyMove.IDLE]: "💤 Riposo",
};

export default function HpBar({ hp, maxHp, variant }: HpBarProps) {
  const { enemyNextMove } = useGame();
  const pct = Math.max(0, Math.min(100, (hp / maxHp) * 100));

  return (
    <div className={styles["hp-bar-wrapper"]}>
      <div className={styles["hp-bar-bg"]}>
        <div
          className={`${styles["hp-bar-fill"]} ${styles[`hp-bar-fill--${variant}`]}`}
          style={{ width: `${pct}%` }}
        />
        <span className={styles["hp-bar-text"]}>
          {hp} / {maxHp} HP
        </span>
      </div>
      <div className={styles["next-move"]}>
        {variant === "monster" ? (
          <span>{MOVE_LABEL[enemyNextMove]}</span>
        ) : (
          <span>&nbsp;</span>
        )}
      </div>
    </div>
  );
}
