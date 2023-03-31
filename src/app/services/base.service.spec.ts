import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { mockPokemon1, mockPokemonAll } from 'src/mocks/pokemon/pokemon.mock';

import { BaseService } from './base.service';

describe(BaseService.name, () => {
  let service: BaseService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(BaseService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  describe(`#${BaseService.prototype.getByUrl.name}`, () => {

    it('should throw ERROR when param is empty', () => {
      expect(() => service.getByUrl('')).toThrow();
    });

    it('should throw ERROR when param not start with https', () => {
      expect(() => service.getByUrl('01145')).toThrow();
    });

    it('should return value from observable', () => {
      service.getByUrl(`${service.API}/pokemon/1`).subscribe(res => {
        expect(res).toEqual(mockPokemon1);
      });

      const req = httpController.expectOne({
        method: 'GET',
        url: `${service.API}/pokemon/1`,
      });

      req.flush(mockPokemon1);
    });
  });

  describe(`#${BaseService.prototype.list.name}`, () => {
    
    it('should throw when called with empty param', () => {
      expect(() => service.list('')).toThrow();
    });

    it('should return value from observable', () => {
      service.list('pokemon').subscribe((res: any) => {
        expect(res).toEqual(mockPokemonAll);
      });

      const req = httpController.expectOne({
        method: 'GET',
        url: `${service.API}/pokemon/`,
      });

      req.flush(mockPokemonAll);
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
