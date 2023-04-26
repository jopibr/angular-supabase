import { NgModule } from '@angular/core';

import { MovimentacaoRoutingModule } from './movimentacao-routing.module';
import { MovimentacaoComponent } from './movimentacao.component';
import { BaseModule } from 'src/app/shared/base/base.module';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    MovimentacaoComponent
  ],
  imports: [
    BaseModule,
    NgSelectModule,
    MovimentacaoRoutingModule
  ]
})
export class MovimentacaoModule { }
