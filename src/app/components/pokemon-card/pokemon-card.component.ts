import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { GenericItem } from 'src/app/models/generic-item.model';
import { Pokemon } from 'src/app/models/pokemon.model';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();
  @Input() data!: GenericItem | Pokemon;

  pokemon!: Pokemon;

  constructor(
    private baseService: BaseService
  ) { }

  ngOnInit(): void {
    this.getMainData();
  }

  getMainData(): void {
    if (this.isGenericItem(this.data)) {
      this.baseService.getByUrl<Pokemon>(this.data.url).pipe(
        takeUntil(this.destroy$)
      ).subscribe((info: Pokemon) => {
        this.pokemon = info;
      })
    } else {
      this.pokemon = this.data;
    }
  }

  private isGenericItem(proof: Pokemon | GenericItem): proof is GenericItem {
    return proof && (<GenericItem>proof).url !== undefined;
  }
}
