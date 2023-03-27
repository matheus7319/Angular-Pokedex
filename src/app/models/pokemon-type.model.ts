import { GenericItem } from "./generic-item.model";

export class PokemonType {
  id!: number;
  name!: string;
  damage_relations!: DamageRelations;
}

export class DamageRelations {
  double_damage_from: DamageType[] = [];
  double_damage_to: DamageType[] = [];
  half_damage_from: DamageType[] = [];
  half_damage_to: DamageType[] = [];
  no_damage_from: DamageType[] = [];
  no_damage_to: DamageType[] = [];
}

export class DamageType extends GenericItem {
  override name!: string;
  override url!: string;
}