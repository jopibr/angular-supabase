import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbMenuBag, NbMenuItem, NbMenuService, NbSidebarService } from '@nebular/theme';
import { User } from '@supabase/supabase-js';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  itens: NbMenuItem[];
  user: User;
  private destroy$ = new Subject<void>();

  constructor(
    private menuService: NbMenuService,
    private sidebarService: NbSidebarService,
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }


  ngOnInit(): void {
    this.criaMenu();
    this.menuService.onItemClick()
    .pipe(takeUntil(this.destroy$))
    .subscribe((menuBag:NbMenuBag) =>{
      if(menuBag.item.title == 'Sair'){
        this.logout();
      }
    })
  }

  criaMenu() {
    this.itens = [
      {
        title: 'Home',
        icon: 'home-outline',
        link: 'home'
      },
      {
        title: 'Movimentações',
        icon: 'calendar-outline',
        link: 'movimentacao'
      },
      {
        title: 'Produtos',
        icon: 'shopping-cart-outline',
        link: 'produto'
      },
      {
        title: 'Categoria',
        icon: 'car-outline',
        link: 'categoria'
      },
      {
        title: 'Sair',
        icon: 'person-remove-outline',
        link: ''
      },
    ];
  }

  toogle(){
    this.sidebarService.toggle(true, 'menu-main');
  }

  logout(){
    this.usuarioService.signOut()
    .then((value) => {
      if(!value.error){
        localStorage.removeItem('@app-estoque:user');
        this.router.navigate(['/login']);
      }
    })
  }

}
