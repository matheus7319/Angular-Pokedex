import { GenericItem } from "./generic-item.model";

export class Pokemon {
  id: number | null = null;
  name: string = '';
  height!: number | null;
  weight!: number | null;
  sprites!: Sprites;
  stats: Stats[] = [];
  types: Slot[] = [];
}

export class Sprites {
  "back_default": string | null;
  "back_female": string | null;
  "back_shiny": string | null;
  "back_shiny_female": string | null;
  "front_default": string | null;
  "front_female": string | null;
  "front_shiny": string | null;
  "front_shiny_female": string | null;
  "other": OtherSprites;
}

export class OtherSprites {
  "dream_world": {
    "front_default": string | null;
    "front_female": string | null;
  };
  "home": {
    "front_default": string | null;
    "front_female": string | null;
    "front_shiny": string | null;
    "front_shiny_female": string | null;
  };
  "official-artwork": {
    "front_default": string | null;
  }
}

export class Stats {
  "base_stat": number;
  "effort": number | null;
  "stat": GenericItem;
}

export class Slot {
  type!: GenericItem;
  slot!: number;
}