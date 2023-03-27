import { Component, Input } from '@angular/core';
import { Stats } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-pokemon-card-attr-line',
  templateUrl: './pokemon-card-attr-line.component.html',
  styleUrls: ['./pokemon-card-attr-line.component.scss']
})
export class PokemonCardAttrLineComponent {

  @Input() stats!: Stats;

  specialStats: SpecialStat[] = [
    { name: 'attack', value: 'ATT' },
    { name: 'defense', value: 'DEF' },
    { name: 'special-attack', value: 'ATT-S' },
    { name: 'special-defense', value: 'DEF-S' },
    { name: 'speed', value: 'SPPD' }
  ]

  createLabel(value: Stats): string {
    return this.specialStats.filter(spp => spp.name == value.stat.name)[0].value;
  }

  statBarValue(value: Stats): number {
    let maxStat = 300;
    let barValue = (100 * value.base_stat) / maxStat;

    return barValue;
  }
}

export class SpecialStat {
  name!: string;
  value!: string;
}