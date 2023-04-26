import { NgModule } from '@angular/core';

import { CategoriaRoutingModule } from './categoria-routing.module';
import { CategoriaComponent } from './categoria.component';
import { BaseModule } from 'src/app/shared/base/base.module';


@NgModule({
  declarations: [
    CategoriaComponent
  ],
  imports: [
    BaseModule,
    CategoriaRoutingModule
  ]
})
export class CategoriaModule { }
