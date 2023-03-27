import { PokemonType } from './pokemon-type.model';

describe(PokemonType.name, () => {

  it('should create an instance', () => {
    expect(new PokemonType()).toBeTruthy();
  });
});
