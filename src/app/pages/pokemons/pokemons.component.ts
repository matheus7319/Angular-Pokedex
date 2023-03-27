import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Paginator } from 'primeng/paginator';
import { debounceTime, Observable, shareReplay } from 'rxjs';
import { tap } from 'rxjs';
import { takeUntil, Subject } from 'rxjs';
import { GenericItem } from 'src/app/models/generic-item.model';
import { GenericRequest, PageParams } from 'src/app/models/generic-request.model';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss'],
})
export class PokemonsComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();

  searchByName = new FormControl();
  isSearching: boolean = false;
  isLoadingData: boolean = false;

  // pokemons$!: Observable<GenericItem[]>;
  // pokemonsTotalPages!: Observable<number>

  // pokemons: GenericItem[] | Pokemon[] = [];
  pokemons: GenericItem[] | Pokemon[] | any[] = [];
  pokemonsCount: number = 1;
  pokemonsPerPage: number = 12;
  pokemonsPage: number = 0;
  pokemonsFirst: number = 0;

  pageParams = new PageParams();

  constructor(
    private fb: FormBuilder,
    private pokemonService: PokemonService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getPokemonList(0);

    this.searchByName.valueChanges.pipe(
      takeUntil(this.destroy$),
      debounceTime(500)
    ).subscribe(typedValue => {
      if (typedValue.length > 0) {
        this.isSearching = true;
        this.getPokemonByID(typedValue.toLowerCase());
      } else {
        this.isSearching = false;
        this.getPokemonList(this.pokemonsPage);
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getPokemonByID(search: string): void {
    this.isLoadingData = true;
    this.pokemonService.getByName(search.toLowerCase()).pipe(
      takeUntil(this.destroy$)
    ).subscribe(pokemon => {
      this.pokemonsCount = 1;
      this.pokemons = [pokemon];
      this.isLoadingData = false;
    }, err => {
      this.messageService.add({ severity: 'error', summary: err.error, detail: err.url });
      this.isLoadingData = false;
    });
  }

  getPokemonList(page: number): void {
    this.pageParams.page = page;
    this.pageParams.limit = this.pokemonsPerPage;
    this.isLoadingData = true;
    this.pokemonService.getAll(this.pageParams).pipe(
      takeUntil(this.destroy$)
    ).subscribe(res => {
      this.pokemonsCount = res.count;
      this.pokemons = res.results;
      this.isLoadingData = false;
    }, err => {
      this.isLoadingData = false;
    });
  }

  onPageChange(e: any) {
    this.pokemonsPage = e.page;
    this.pokemonsFirst = e.first;
    this.getPokemonList(this.pokemonsPage);
  }

}
