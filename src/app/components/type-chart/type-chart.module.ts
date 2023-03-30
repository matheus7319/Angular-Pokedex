import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
import { TypeChartComponent } from './type-chart.component';



@NgModule({
  declarations: [
    TypeChartComponent
  ],
  imports: [
    CommonModule,
    HighchartsChartModule
  ],
  exports: [
    TypeChartComponent
  ]
})
export class TypeChartModule { }
