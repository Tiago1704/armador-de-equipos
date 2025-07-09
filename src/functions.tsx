type Linea = "top" | "jg" | "mid" | "adc" | "sup";

export interface Champion {
  version: string;
  id: string;
  key: string;
  name: string;
  title: string;
  blurb: string;
  info: {
    attack: number;
    defense: number;
    magic: number;
    difficulty: number;
  };
  image: {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
  };
  tags: string[]; // ej: ["Fighter", "Tank"]
  partype: string;
  stats: {
    hp: number;
    hpperlevel: number;
    mp: number;
    mpperlevel: number;
    movespeed: number;
    armor: number;
    armorperlevel: number;
    spellblock: number;
    spellblockperlevel: number;
    attackrange: number;
    hpregen: number;
    hpregenperlevel: number;
    mpregen: number;
    mpregenperlevel: number;
    crit: number;
    critperlevel: number;
    attackdamage: number;
    attackdamageperlevel: number;
    attackspeedperlevel: number;
    attackspeed: number;
  };
}


type CampeonesPorLinea = {
  [K in Linea]: Champion[];
};

export function agruparPorLinea(champions: Champion[]): CampeonesPorLinea {
  const resultado: CampeonesPorLinea = {
    top: [],
    jg: [],
    mid: [],
    adc: [],
    sup: [],
  };

  for (const champ of champions) {
    const tags = champ.tags;

    if (tags.includes("Tank") || tags.includes("Fighter")) {
      resultado.top.push(champ);
    }

    if (tags.includes("Fighter") || tags.includes("Assassin")) {
      resultado.jg.push(champ);
    }

    if (tags.includes("Mage") || tags.includes("Assassin")) {
      resultado.mid.push(champ);
    }

    if (tags.includes("Marksman")) {
      resultado.adc.push(champ);
    }

    if (tags.includes("Support")) {
      resultado.sup.push(champ);
    }
  }

  return resultado;
}