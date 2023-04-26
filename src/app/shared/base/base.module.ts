import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule, NbDialogModule, NbToastrModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NbDialogModule.forChild(),
    NbCardModule,
    NbToastrModule.forRoot(),
    ReactiveFormsModule,
    FormlyModule.forChild({
      validationMessages:[
        {name:'required', message: 'Campo Obrigatório'},
      ]
    }),
    FormlyBootstrapModule    
  ],
  exports: [
    CommonModule,
    NbDialogModule,
    NbCardModule,
    NbToastrModule,
    ReactiveFormsModule,
    FormsModule,
    FormlyModule,
    FormlyBootstrapModule 
  ]
})
export class BaseModule { }

