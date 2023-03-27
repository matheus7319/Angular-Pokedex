import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonsComponent } from './pages/pokemons/pokemons.component';
import { TypesComponent } from './pages/types/types.component';

const routes: Routes = [
  { path: '', redirectTo: 'pokemons', pathMatch: 'full' },
  { path: 'types', component: TypesComponent },
  { path: 'pokemons', component: PokemonsComponent },

  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
  { path: 'not-found', component: PokemonsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
