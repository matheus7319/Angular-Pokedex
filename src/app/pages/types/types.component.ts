import { Component, OnInit, OnDestroy } from '@angular/core';
import { GenericItem } from 'src/app/models/generic-item.model';
import { DamageType, PokemonType } from 'src/app/models/pokemon-type.model';
import { BaseService } from 'src/app/services/base.service';
import { Observable, shareReplay } from 'rxjs';
import { FormControl } from '@angular/forms';

import { takeUntil } from 'rxjs';
import { Subject } from 'rxjs';
import { map } from 'rxjs';
import { GenericRequest, PageParams } from 'src/app/models/generic-request.model';
import { PokemonTypeService } from 'src/app/services/pokemon-type.service';

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.scss']
})

export class TypesComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();

  axisCategories: GenericItem[] = [];
  pokemonType!: PokemonType;

  pkmnTypes$!: Observable<GenericItem[]>;
  dropdownOptions: FormControl<GenericItem> = new FormControl();

  effectiveness!: DamageType[];
  weakness!: DamageType[];

  pageParams = new PageParams();

  constructor(
    private pokemonTypeService: PokemonTypeService,
    private baseService: BaseService
  ) {

  }

  ngOnInit(): void {
    this.getPokemonTypesList();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getPokemonTypesList(): void {
    this.pkmnTypes$ = this.pokemonTypeService.getAll().pipe(
      map((list: GenericRequest) => list.results),
      shareReplay()
    )
    this.pkmnTypes$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(types => {
      this.axisCategories = types;
    })
  }

  pkmnTypeOnChange(ev: any): void {
    const item: GenericItem = ev.value;
    if (item.url) {
      this.getTypeBy(item.url);
    }
  }

  getTypeBy(url: string): void {
    this.pokemonType;
    this.baseService.getByUrl<PokemonType>(url).pipe(
      takeUntil(this.destroy$)
    ).subscribe(pokemonType => {
      this.effectiveness = [
        ...pokemonType.damage_relations.double_damage_to
      ];

      this.weakness = [
        ...pokemonType.damage_relations.double_damage_from
      ];

      this.pokemonType = pokemonType;
    });
  }
}