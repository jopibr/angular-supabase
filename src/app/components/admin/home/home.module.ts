import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BaseModule } from 'src/app/shared/base/base.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    BaseModule,
    NgxChartsModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
