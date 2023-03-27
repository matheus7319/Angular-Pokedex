import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { of } from 'rxjs';
import { GenericItem } from 'src/app/models/generic-item.model';
import { Pokemon } from 'src/app/models/pokemon.model';

import { BaseService } from 'src/app/services/base.service';
import { mockPokemon1 } from 'src/mocks/pokemon/pokemon.mock';
import { PokemonCardSkeletonComponent } from './pokemon-card-skeleton/pokemon-card-skeleton.component';
import { PokemonCardComponent } from './pokemon-card.component';

describe(PokemonCardComponent.name, () => {
  let component: PokemonCardComponent;
  let fixture: ComponentFixture<PokemonCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonCardComponent, PokemonCardSkeletonComponent],
      imports: [CardModule, SkeletonModule],
      providers: [BaseService, HttpClient, HttpHandler]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PokemonCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe(`#${PokemonCardComponent.prototype.getMainData.name}`, () => {
    it('should populate pokemon with data when (@Input() data) is GenericItem', () => {
      let baseService = fixture.debugElement.injector.get(BaseService);
      let generic = new GenericItem();
      generic.name = 'bulbasaur';
      generic.url = 'https://pokeapi.co/api/v2/pokemon/1/';

      let pokemon = new Pokemon();
      pokemon.id = mockPokemon1.id;
      pokemon.name = mockPokemon1.name;
      pokemon.weight = mockPokemon1.weight;
      pokemon.height = mockPokemon1.height;
      pokemon.sprites = mockPokemon1.sprites;
      pokemon.stats = mockPokemon1.stats;
      pokemon.types = mockPokemon1.types;

      component.data = generic;

      spyOn<any>(baseService, 'getByUrl').and.callFake(() => {
        return of(pokemon)
      });

      component.getMainData();
      expect(component.pokemon).toEqual(pokemon);
    });

    it('should populate pokemon with pokemon when (@Input() data) Pokemon', () => {
      let pokemon = new Pokemon();
      pokemon.id = mockPokemon1.id;
      pokemon.name = mockPokemon1.name;
      pokemon.weight = mockPokemon1.weight;
      pokemon.height = mockPokemon1.height;
      pokemon.sprites = mockPokemon1.sprites;
      pokemon.stats = mockPokemon1.stats;
      pokemon.types = mockPokemon1.types;

      component.data = pokemon;

      component.getMainData();
      expect(component.pokemon).toEqual(pokemon);
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
