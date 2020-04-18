import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from './toolbar/toolbar.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    ToolbarModule
  ],
  exports: [
    ToolbarModule
  ]
})
export class CoreModule { }
