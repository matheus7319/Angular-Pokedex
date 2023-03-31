import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { KeyFilterModule } from 'primeng/keyfilter';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { of, tap, throwError } from 'rxjs';
import { GenericRequest } from 'src/app/models/generic-request.model';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon.service';
import { PageMasterComponent } from 'src/app/templates/page-master/page-master.component';
import { mockPokemon1, mockPokemonAll } from 'src/mocks/pokemon/pokemon.mock';

import { PokemonsComponent } from './pokemons.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe(PokemonsComponent.name, () => {
  let component: PokemonsComponent;
  let fixture: ComponentFixture<PokemonsComponent>;
  let debug: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonsComponent, PageMasterComponent],
      imports: [
        ToolbarModule,
        PaginatorModule,
        FormsModule,
        ReactiveFormsModule,
        KeyFilterModule,
        ToastModule,
        ProgressSpinnerModule
      ],
      providers: [
        PokemonService,
        HttpClient,
        HttpHandler,
        MessageService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PokemonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  describe(`#${PokemonsComponent.prototype.getPokemonList.name}`, () => {
    let pokemonService: any;
    let genericRequest: GenericRequest;

    beforeEach(() => {
      pokemonService = fixture.debugElement.injector.get(PokemonService);
      genericRequest = new GenericRequest();
      genericRequest.count = mockPokemonAll.count;
      genericRequest.next = mockPokemonAll.next;
      genericRequest.previous = mockPokemonAll.previous;
      genericRequest.results = mockPokemonAll.results;
    });

    it('should fill pokemons with results array of result of subscribe', () => {
      let testParam = 0;

      spyOn(pokemonService, 'getAll').and.callFake(() => {
        return of(genericRequest)
      });

      component.getPokemonList(testParam);
      expect(component.pokemons).toEqual(genericRequest.results);
    });

    it('should fill pokemonsCount with pokemon qtd of result subscribe', () => {
      let testParam = 0;

      spyOn(pokemonService, 'getAll').and.callFake(() => {
        return of(genericRequest)
      });

      component.getPokemonList(testParam);
      expect(component.pokemonsCount).toEqual(genericRequest.count);
    });
  });

  describe(`#${PokemonsComponent.prototype.getPokemonByID.name}`, () => {
    let pokemonService: any;
    let pokemon: Pokemon;

    beforeEach(() => {
      pokemonService = fixture.debugElement.injector.get(PokemonService);
      pokemon = new Pokemon();
      pokemon.id = mockPokemon1.id;
      pokemon.name = mockPokemon1.name;
      pokemon.weight = mockPokemon1.weight;
      pokemon.height = mockPokemon1.height;
      pokemon.sprites = mockPokemon1.sprites;
      pokemon.stats = mockPokemon1.stats;
      pokemon.types = mockPokemon1.types;
    });

    it('should return a object with data of a specific pokemon', () => {
      spyOn(pokemonService, 'getByName').and.callFake(() => {
        return of(pokemon)
      });

      component.getPokemonByID('1');
      expect(component.pokemons).toEqual([pokemon]);
    });
  });

  describe(`#${PokemonsComponent.prototype.onSearchPokemon.name}`, () => {
    let pokemonService: any;

    beforeEach(() => {
      pokemonService = fixture.debugElement.injector.get(PokemonService);
    });

    it('should call (getPokemonByID) && set (isSearching) TRUE if (searchByName) has VALUE', () => {
      spyOn(component, 'getPokemonByID');
      component.searchByName.setValue('1');
      component.onSearchPokemon();

      expect(component.isSearching).toBeTrue();
      expect(component.getPokemonByID).toHaveBeenCalled();
    });

    it('should NOT call (getPokemonByID) && set (isSearching) FALSE if (searchByName) is EMPTY', () => {
      spyOn(component, 'getPokemonByID');
      component.searchByName.setValue('');
      component.onSearchPokemon();

      expect(component.isSearching).toBeFalse();
      expect(component.getPokemonByID).not.toHaveBeenCalled();
    });
  });

  describe(`#${PokemonsComponent.prototype.onPageChange.name}`, () => {
    it('should get next page', () => {
      spyOn(component, 'getPokemonList');
      const buttonNext = debug.query(By.css('.p-paginator-next'));

      buttonNext.triggerEventHandler('click', {
        "page": 1,
        "first": 12,
        "rows": 12,
        "pageCount": 107
      });

      component.onPageChange({
        "page": 1,
        "first": 12,
        "rows": 12,
        "pageCount": 107
      });

      expect(component.pokemonsFirst).toBe(12);
      expect(component.pokemonsPage).toBe(1);
      expect(component.getPokemonList).toHaveBeenCalled();
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
