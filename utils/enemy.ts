type EnemyDB = {
  name: string;
  finalMessage: string;
  image: string;
};

export type Enemy = {
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  heal: number;
  name: string;
  image: string;
  finalMessage: string;
};

export interface Character {
  hp: number;
  maxHp: number;
  name: string;
  image: string;
}

export const RANDOM_FACTOR = 0.2;

export const ENEMY_HP = 80;
export const ENEMY_HP_INCREMENT = 0.2;

export const ENEMY_ATTACK = 5;
export const ENEMY_ATTACK_INCREMENT = 0.2;

export const ENEMY_DEFENSE = 5;
export const ENEMY_DEFENSE_INCREMENT = 0.2;

export const ENEMY_HEAL = 5;
export const ENEMY_HEAL_INCREMENT = 0.2;

export const ENEMY_POOL: EnemyDB[] = [
  {
    name: "Goblin",
    finalMessage:
      "Un goblin malvagio appare! Lorem ipsum dolor sit amet, un drago feroce appare! Lorem ipsum dolor sit amet, un drago feroce appare!",
    image: "https://placehold.co/160x160/a855f7/fff?text=Goblin",
  },
  {
    name: "Drago",
    finalMessage:
      "Lorem ipsum dolor sit amet, un drago feroce appare!Lorem ipsum dolor sit amet, un drago feroce appare!",
    image: "https://placehold.co/160x160/ef4444/fff?text=Drago",
  },
  {
    name: "Scheletro",
    finalMessage:
      "Uno scheletro inquietante appare!  Lorem ipsum dolor sit amet, un drago feroce appare! Lorem ipsum dolor sit amet, un drago feroce appare!",
    image: "https://placehold.co/160x160/94a3b8/fff?text=Scheletro",
  },
  {
    name: "Gabbibbo",
    finalMessage:
      "Il temibile Gabbibbo appare! Lorem ipsum dolor sit amet, un drago feroce appare! Lorem ipsum dolor sit amet, un drago feroce appare!",
    image: "https://placehold.co/160x160/94a3b8/fff?text=Gabbibbo",
  },
];

function buildEnemyPool(pool: typeof ENEMY_POOL): Enemy[] {
  return pool.map((enemy, key) => ({
    hp: ENEMY_HP + Math.floor(ENEMY_HP * ENEMY_HP_INCREMENT * key),
    maxHp: ENEMY_HP + Math.floor(ENEMY_HP * ENEMY_HP_INCREMENT * key),
    attack:
      ENEMY_ATTACK + Math.floor(ENEMY_ATTACK * ENEMY_ATTACK_INCREMENT * key),
    defense:
      ENEMY_DEFENSE + Math.floor(ENEMY_DEFENSE * ENEMY_DEFENSE_INCREMENT * key),
    heal: ENEMY_HEAL + Math.floor(ENEMY_HEAL * ENEMY_HEAL_INCREMENT * key),
    name: enemy.name,
    image: enemy.image,
    finalMessage: enemy.finalMessage,
  }));
}

export function setupEnemyPool(): Enemy[] {
  // Shuffle ENEMY_POOL (Fisher-Yates)
  const shuffled = [...ENEMY_POOL];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return buildEnemyPool(shuffled);
}
