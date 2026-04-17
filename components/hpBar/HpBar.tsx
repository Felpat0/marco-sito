import { EnemyMove, useGame } from "@/app/gameContext";
import styles from "./hpBar.module.css";
import IconsAction from "../IconsAction/IconsAction";

interface HpBarProps {
  hp: number;
  maxHp: number;
  variant: "player" | "monster";
}

const MOVE_TYPE: Record<EnemyMove, "attack" | "defend" | "heal" | "idle"> = {
  [EnemyMove.ATTACK]: "attack",
  [EnemyMove.DEFEND]: "defend",
  [EnemyMove.HEAL]: "heal",
  [EnemyMove.IDLE]: "idle",
};

export default function HpBar({ hp, maxHp, variant }: HpBarProps) {
  const { enemyNextMove, enemyNextMoveValue } = useGame();
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
      {variant === "monster" ? (
        <IconsAction
          type={MOVE_TYPE[enemyNextMove]}
          value={enemyNextMoveValue}
        />
      ) : (
        <span style={{ visibility: "hidden" }}>
          <IconsAction type="idle" />
        </span>
      )}
    </div>
  );
}
