import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonsComponent } from './pages/pokemons/pokemons.component';

const routes: Routes = [
  { path: '', redirectTo: 'pokemons', pathMatch: 'full' },
  {
    path: 'types',
    loadChildren: () => import('./pages/types/types.module').then(m => m.TypesModule)
  },
  {
    path: 'pokemons',
    loadChildren: () => import('./pages/pokemons/pokemons.module').then(m => m.PokemonsModule)
  },

  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
  { path: 'not-found', component: PokemonsComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
