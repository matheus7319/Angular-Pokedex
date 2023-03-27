import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { KeyFilterModule } from 'primeng/keyfilter';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { of } from 'rxjs';
import { GenericRequest } from 'src/app/models/generic-request.model';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon.service';
import { PageMasterComponent } from 'src/app/templates/page-master/page-master.component';
import { mockPokemon1, mockPokemonAll } from 'src/mocks/pokemon/pokemon.mock';

import { PokemonsComponent } from './pokemons.component';

describe(PokemonsComponent.name, () => {
  let component: PokemonsComponent;
  let fixture: ComponentFixture<PokemonsComponent>;

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
  });

  describe(`#${PokemonsComponent.prototype.getPokemonList.name}`, () => {
    it('should return a list of pokemons with GenericRequest', () => {
      let pokemonService = fixture.debugElement.injector.get(PokemonService);
      let page = 0;

      let genericRequest = new GenericRequest();
      genericRequest.count = mockPokemonAll.count;
      genericRequest.next = mockPokemonAll.next;
      genericRequest.previous = mockPokemonAll.previous;
      genericRequest.results = mockPokemonAll.results;

      spyOn(pokemonService, 'getAll').and.callFake(() => {
        return of(genericRequest)
      });

      component.getPokemonList(page);
      expect(component.pokemonsCount).toEqual(genericRequest.count);
      expect(component.pokemons).toEqual(genericRequest.results);
    });
  });

  describe(`#${PokemonsComponent.prototype.getPokemonByID.name}`, () => {
    it('should return a object with data of a specific pokemon', () => {
      let pokemonService = fixture.debugElement.injector.get(PokemonService);
      let search = '1';

      let pokemon = new Pokemon();
      pokemon.id = mockPokemon1.id;
      pokemon.name = mockPokemon1.name;
      pokemon.weight = mockPokemon1.weight;
      pokemon.height = mockPokemon1.height;
      pokemon.sprites = mockPokemon1.sprites;
      pokemon.stats = mockPokemon1.stats;
      pokemon.types = mockPokemon1.types;

      spyOn(pokemonService, 'getByName').and.callFake(() => {
        return of(pokemon)
      });

      component.getPokemonByID(search);
      expect(component.pokemons).toEqual([pokemon]);
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
