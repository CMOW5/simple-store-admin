import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesListRoutingModule } from './categories-list-routing.module';
import { CategoriesListComponent } from './categories-list.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [CategoriesListComponent],
  imports: [
    CommonModule,
    CategoriesListRoutingModule,
    SharedModule
  ]
})
export class CategoriesListModule { }
