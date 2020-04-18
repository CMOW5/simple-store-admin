import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesListModule } from './categories-list/categories-list.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CategoriesListModule,
    CategoriesRoutingModule
  ]
})
export class CategoriesModule { }
