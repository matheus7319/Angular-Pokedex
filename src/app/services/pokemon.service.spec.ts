import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { mockPokemon1 } from 'src/mocks/pokemon/pokemon.mock';
import { mockPokemonTypesAll } from 'src/mocks/pokemonTypes/pokemon-type.mock';

import { PokemonService } from './pokemon.service';

describe(PokemonService.name, () => {
  let service: PokemonService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(PokemonService);
    httpController = TestBed.inject(HttpTestingController);
  });

  describe(`#${PokemonService.prototype.getAll.name}`, () => {

    it('should return value from observable', () => {
      service.getAll().subscribe((res: any) => {
        expect(res).toEqual(mockPokemonTypesAll);
      });

      const req = httpController.expectOne({
        method: 'GET',
        url: `${service.API}/pokemon/?limit=12&offset=0`,
      });

      req.flush(mockPokemonTypesAll);
    });
  })

  describe(`#${PokemonService.prototype.getByName.name}`, () => {

    it('should throw when param not alphanumeric', () => {
      expect(() => service.getByName('@')).toThrow();
    })

    it('should return value from observable', () => {
      service.getByName('1').subscribe((res: any) => {
        expect(res).toEqual(mockPokemon1);
      });

      const req = httpController.expectOne({
        method: 'GET',
        url: `${service.API}/pokemon/1`,
      });

      req.flush(mockPokemon1);
    });
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
