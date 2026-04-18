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

export const ENEMY_HP = 10;
export const ENEMY_HP_INCREMENT = 0.2;

export const ENEMY_ATTACK = 5;
export const ENEMY_ATTACK_INCREMENT = 0.2;

export const ENEMY_DEFENSE = 1;
export const ENEMY_DEFENSE_INCREMENT = 0.2;

export const ENEMY_HEAL = 1;
export const ENEMY_HEAL_INCREMENT = 0.2;

export const ENEMY_POOL: EnemyDB[] = [
  {
    name: "Gremrika Gizmo",
    finalMessage:
      "Finalmente! Eravamo rimasti senza preghiere e senza fioretto, ormai pensavamo che il prof di Analisi ti avrebbe inserito nello stato di famiglia! È stata una battaglia epica, ma alla fine hai vinto tu per sfinimento dell’avversario. Congratulazioni Dottore, goditi il traguardo!",
    image: "/images/enemy/Erika.png",
  },
  {
    name: "Davislime",
    finalMessage:
      "Caro Marcolino ti faccio i miei piu sentiti auguri per la tua laurea. Spero tu possa trovare il lavoro che desideri per fare i money che ti serviranno a campare ❤️",
    image: "/images/enemy/Davide.png",
  },
  {
    name: "Vincenzonte",
    finalMessage:
      "Siamo cresciuti insieme e sappiamo che la fortuna non ti manca, ma per questa laurea il 'culo sfacciato' non è bastato: te lo sei dovuto rompere per davvero. Orgogliosi di te, dottore!",
    image: "/images/enemy/Vins.png",
  },
  {
    name: "Vapurby",
    finalMessage:
      "Anche se non te lo dico mai, sono incredibilmente fiero di te e del tuo percorso. Ti voglio bene.",
    image: "/images/enemy/Vape.png",
  },
  {
    name: "Banshylenia",
    finalMessage:
      "Tra una spalla distrutta, la palestra, i tornei e le serate, sei riuscito pure a laurearti. Non male come build",
    image: "/images/enemy/Ylenia.png",
  },
  {
    name: "Principessa Sirelena",
    finalMessage:
      "Tanti auguri per essere finalmente riuscito ad entrare nel club dei laureati! Ma.. in cosa ti sei laureato?",
    image: "/images/enemy/Elena.png",
  },
  {
    name: "Sfinge di Chiapatra",
    finalMessage:
      "Super congratulazioni per questo enorme traguardo... anche se matematica era meglio.",
    image: "/images/enemy/Chiara.png",
  },
  {
    name: "Death - Cattini con gli stivalini",
    finalMessage:
      "Hai spanato l'ano a Picardello e Roselli, e adesso anche a me ( ;)))) ). All'open day di STM ci hanno detto che la maggior parte degli studenti rinuncia prima di riuscire a laurearsi, ma tu non l'hai fatto e beh eccoti qui. Vanne fiero, renditi conto del traguardo che hai tagliato.",
    image: "/images/enemy/Fede.png",
  },
  {
    name: "Riccarbibbo",
    finalMessage:
      "Congratulazioni per questo grande traguardo! Ti aspettano nuovi mondi da esplorare, ovunque andrai non ti scorderò mai: dopotutto, il primo bacio non si scorda mai!",
    image: "/images/enemy/Perr.png",
  },
  {
    name: "Scimpandré ",
    finalMessage:
      "Eccoci qua, c'è chi ormai stava perdendo le speranze(te compreso), eppure io sapevo che ce l'avresti fatta. Rimpiango di non essere rimasto a farti compagnia in questo viaggio, ma forse è stato meglio cosi. Anche se questa storia si è conclusa, l'avventura non è finita; Ci saranno nuovi obbiettivi da raggiungere e traguardi da superare, ma facciamo un passo alla volta, per adesso brindiamo a questo tuo successo, il resto verrà da se. Auguri Dottore.",
    image: "/images/enemy/Andrea.png",
  },
  {
    name: "Gatto del Bombishire",
    finalMessage:
      "Eh ma fammelo Gioca! Ma poi alla fine quando giochi vedi che gli obbiettivi li raggiungi, complimenti dottore… o ingegnere.",
    image: "/images/enemy/Bombi.png",
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
