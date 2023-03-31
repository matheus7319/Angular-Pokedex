import { DamageRelations, DamageType, PokemonType } from './pokemon-type.model';

describe(PokemonType.name, () => {

  it('should create an instance of PokemonType', () => {
    expect(new PokemonType()).toBeTruthy();
  });

  it('should create an instance of DamageRelations', () => {
    expect(new DamageRelations()).toBeTruthy();
  });

  it('should create an instance of DamageType ', () => {
    expect(new DamageType()).toBeTruthy();
  });
});
