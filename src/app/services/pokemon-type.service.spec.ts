import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { mockPokemonTypesAll } from 'src/mocks/pokemonTypes/pokemon-type.mock';

import { PokemonTypeService } from './pokemon-type.service';

describe(PokemonTypeService.name, () => {
  let service: PokemonTypeService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(PokemonTypeService);
    httpController = TestBed.inject(HttpTestingController);
  });

  describe(`#${PokemonTypeService.prototype.getAll.name}`, () => {

    it('should return value from observable', () => {
      service.getAll().subscribe((res: any) => {
        expect(res).toEqual(mockPokemonTypesAll);
      });

      const req = httpController.expectOne({
        method: 'GET',
        url: `${service.API}/type/`,
      });

      req.flush(mockPokemonTypesAll);
    });
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
