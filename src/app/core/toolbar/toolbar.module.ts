import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolbarRoutingModule } from './toolbar-routing.module';
import { ToolbarComponent } from './toolbar.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    CommonModule,
    ToolbarRoutingModule,
    SharedModule
  ],
  exports: [ToolbarComponent]
})
export class ToolbarModule { }
