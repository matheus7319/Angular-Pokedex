import { Component, Input } from '@angular/core';
import { Slot, Stats } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-pokemon-card-footer',
  templateUrl: './pokemon-card-footer.component.html',
  styleUrls: ['./pokemon-card-footer.component.scss']
})
export class PokemonCardFooterComponent {

  @Input() slotType!: Slot[];


}
