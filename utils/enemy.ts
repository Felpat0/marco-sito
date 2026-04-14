type Enemy = {
  name: string;
  image: string;
};

export const ENEMY_HP = 80;
export const ENEMY_INCREMENT = 0.2;

export const ENEMY_POOL: Enemy[] = [
  {
    name: "Goblin",
    image: "https://placehold.co/160x160/a855f7/fff?text=Goblin",
  },
  {
    name: "Drago",
    image: "https://placehold.co/160x160/ef4444/fff?text=Drago",
  },
  {
    name: "Scheletro",
    image: "https://placehold.co/160x160/94a3b8/fff?text=Scheletro",
  },
  {
    name: "Gabbibbo",
    image: "https://placehold.co/160x160/94a3b8/fff?text=Gabbibbo",
  },
];

export interface Character {
  hp: number;
  maxHp: number;
  name: string;
  image: string;
}

function buildEnemyPool(pool: typeof ENEMY_POOL): Character[] {
  return pool.map((enemy, key) => ({
    hp: ENEMY_HP + Math.floor(ENEMY_HP * ENEMY_INCREMENT * key),
    maxHp: ENEMY_HP + Math.floor(ENEMY_HP * ENEMY_INCREMENT * key),
    name: enemy.name,
    image: enemy.image,
  }));
}

export function setupEnemyPool(): Character[] {
  // Shuffle ENEMY_POOL (Fisher-Yates)
  const shuffled = [...ENEMY_POOL];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return buildEnemyPool(shuffled);
}
