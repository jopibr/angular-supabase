import { NgModule } from '@angular/core';

import { ProdutoRoutingModule } from './produto-routing.module';
import { ProdutoComponent } from './produto.component';
import { BaseModule } from 'src/app/shared/base/base.module';


@NgModule({
  declarations: [
    ProdutoComponent
  ],
  imports: [
    BaseModule,
    ProdutoRoutingModule
  ]
})
export class ProdutoModule { }
