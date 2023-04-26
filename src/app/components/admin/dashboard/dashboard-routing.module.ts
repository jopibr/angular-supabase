import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module')
          .then((m) => m.HomeModule)
      },
      {
        path: 'categoria',
        loadChildren: () => import('../categoria/categoria.module')
          .then((m) => m.CategoriaModule)
      },
      {
        path: 'produto',
        loadChildren: () => import('../produto/produto.module')
          .then((m) => m.ProdutoModule)
      },
      {
        path: 'movimentacao',
        loadChildren: () => import('../movimentacao/movimentacao.module')
          .then((m) => m.MovimentacaoModule)
      }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
