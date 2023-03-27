import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { debounceTime, Observable, shareReplay } from 'rxjs';
import { tap } from 'rxjs';
import { takeUntil, Subject } from 'rxjs';
import { GenericItem } from 'src/app/models/generic-item.model';
import { GenericRequest, PageParams } from 'src/app/models/generic-request.model';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss']
})
export class PokemonsComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();

  searchByName = new FormControl();

  // pokemons$!: Observable<GenericItem[]>;
  // pokemonsTotalPages!: Observable<number>

  // pokemons: GenericItem[] | Pokemon[] = [];
  pokemons: GenericItem[] | Pokemon[] | any[] = [];
  pokemonsCount: number = 1;
  pokemonsPerPage: number = 12;
  pokemonsPage: number = 0;

  pageParams = new PageParams();

  constructor(
    private fb: FormBuilder,
    private pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
    this.getPokemonList(0);

    this.searchByName.valueChanges.pipe(
      takeUntil(this.destroy$),
      debounceTime(500)
    ).subscribe(typedValue => {
      if (typedValue.length > 0) {
        this.getPokemonByID(typedValue);
      } else {
        this.getPokemonList(this.pokemonsPage);
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getPokemonByID(search: string): void {
    this.pokemonService.getByName(search).pipe(
      takeUntil(this.destroy$)
    ).subscribe(pokemon => {
      this.pokemonsCount = 1;
      this.pokemons = [pokemon];
    });
  }

  getPokemonList(page: number): void {
    this.pageParams.page = page;
    this.pageParams.limit = this.pokemonsPerPage;

    this.pokemonService.getAll(this.pageParams).pipe(
      takeUntil(this.destroy$)
    ).subscribe(res => {
      this.pokemonsCount = res.count;
      this.pokemons = res.results;
    });
  }

  onPageChange(e: any) {
    this.pokemonsPage = e.page;
    this.getPokemonList(this.pokemonsPage);
  }

}
