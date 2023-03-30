import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonCardComponent } from './pokemon-card.component';
import { PokemonCardHeaderComponent } from './pokemon-card-header/pokemon-card-header.component';
import { PokemonCardFooterComponent } from './pokemon-card-footer/pokemon-card-footer.component';
import { PokemonCardAttrLineComponent } from './pokemon-card-attr-line/pokemon-card-attr-line.component';
import { PokemonCardSkeletonComponent } from './pokemon-card-skeleton/pokemon-card-skeleton.component';
import { SkeletonModule } from 'primeng/skeleton';
import { ProgressBarModule } from 'primeng/progressbar';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { TypeIconModule } from '../type-icon/type-icon.module';


@NgModule({
  declarations: [
    PokemonCardComponent,
    PokemonCardHeaderComponent,
    PokemonCardFooterComponent,
    PokemonCardAttrLineComponent,
    PokemonCardSkeletonComponent
  ],
  imports: [
    CommonModule,
    SkeletonModule,
    ProgressBarModule,
    CardModule,
    ChipModule,
    TypeIconModule
  ],
  exports: [
    PokemonCardComponent
  ]
})
export class PokemonCardModule { }
