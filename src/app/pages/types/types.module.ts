import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TypesRoutingModule } from './types-routing.module';
import { TabViewModule } from 'primeng/tabview';
import { ToolbarModule } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { TypesComponent } from './types.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TypeChartModule } from 'src/app/components/type-chart/type-chart.module';
import { TypeIconModule } from 'src/app/components/type-icon/type-icon.module';


@NgModule({
  declarations: [
    TypesComponent
  ],
  imports: [
    CommonModule,
    TypesRoutingModule,
    TabViewModule,
    ToolbarModule,
    DropdownModule,
    CardModule,
    ReactiveFormsModule,
    TypeChartModule,
    TypeIconModule
  ]
})
export class TypesModule { }
