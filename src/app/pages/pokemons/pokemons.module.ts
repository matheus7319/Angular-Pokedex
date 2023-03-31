import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonsRoutingModule } from './pokemons-routing.module';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ReactiveFormsModule } from '@angular/forms';
import { PokemonCardModule } from 'src/app/components/pokemon-card/pokemon-card.module';
import { PokemonsComponent } from './pokemons.component';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [
    PokemonsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PokemonsRoutingModule,
    ToastModule,
    ToolbarModule,
    ProgressSpinnerModule,
    PaginatorModule,
    PokemonCardModule,
    InputTextModule
  ],
  providers: [
    MessageService
  ]
})
export class PokemonsModule { }
