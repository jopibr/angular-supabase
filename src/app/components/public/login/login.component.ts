import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  message: string;

  form: FormGroup;

  constructor(
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    });   
  }

  login(){
    this.spinner.show();
    this.usuarioService.signIn(this.form.get('email').value, this.form.get('password').value)
    .then((value)=>{
      if (value.error){
        this.message = `Não foi possível efetuar o login. Detalhes: ${value.error.message}`;
        this.spinner.hide();
      }else{
        localStorage.setItem('@app-estoque:user', value.user.email);
        this.router.navigateByUrl('/admin/dashboard/home');
        this.spinner.hide();
      }
    })
  }



}
