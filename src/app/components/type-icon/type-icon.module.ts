import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TypeIconComponent } from './type-icon.component';



@NgModule({
  declarations: [
    TypeIconComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [
    TypeIconComponent
  ]
})
export class TypeIconModule { }
