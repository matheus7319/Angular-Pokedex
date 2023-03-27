import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TypesComponent } from './pages/types/types.component';
import { PokemonsComponent } from './pages/pokemons/pokemons.component';

import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { PokemonCardHeaderComponent } from './components/pokemon-card/pokemon-card-header/pokemon-card-header.component';
import { PokemonCardFooterComponent } from './components/pokemon-card/pokemon-card-footer/pokemon-card-footer.component';
import { PokemonCardAttrLineComponent } from './components/pokemon-card/pokemon-card-attr-line/pokemon-card-attr-line.component';
import { PokemonCardSkeletonComponent } from './components/pokemon-card/pokemon-card-skeleton/pokemon-card-skeleton.component';

import { TypeIconComponent } from './components/type-icon/type-icon.component';
import { TypeChartComponent } from './components/type-chart/type-chart.component';

import { PageMasterComponent } from './templates/page-master/page-master.component';

import { HighchartsChartModule } from 'highcharts-angular';

import { DropdownModule } from 'primeng/dropdown';
import { MenuModule } from 'primeng/menu';
import { TabMenuModule } from 'primeng/tabmenu';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PaginatorModule } from 'primeng/paginator';
import { ChipModule } from 'primeng/chip';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { SkeletonModule } from 'primeng/skeleton';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { TabViewModule } from 'primeng/tabview';
import { AnimateModule } from 'primeng/animate';

import { LayoutModule } from '@angular/cdk/layout';

const primeNgModule = [
  DropdownModule,
  MenuModule,
  TabMenuModule,
  SidebarModule,
  ButtonModule,
  CardModule,
  PaginatorModule,
  ChipModule,
  ProgressBarModule,
  ToastModule,
  SkeletonModule,
  InputTextModule,
  ToolbarModule,
  TabViewModule,
  AnimateModule
];

const AngularCdkModule = [
  LayoutModule
];

@NgModule({
  declarations: [
    AppComponent,
    TypesComponent,
    PokemonsComponent,
    PokemonCardComponent,
    TypeIconComponent,
    PageMasterComponent,
    PokemonCardHeaderComponent,
    PokemonCardFooterComponent,
    PokemonCardAttrLineComponent,
    TypeChartComponent,
    PokemonCardSkeletonComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HighchartsChartModule,
    primeNgModule,
    AngularCdkModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
