import { Component, Input } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-pokemon-card-header',
  templateUrl: './pokemon-card-header.component.html',
  styleUrls: ['./pokemon-card-header.component.scss']
})
export class PokemonCardHeaderComponent {

  @Input() pokemon!: Pokemon;
}
