import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from 'src/app/services/crud.service';
import * as sha from 'sha.js';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formularioLogin:FormGroup;
  exito:boolean=false;
  respuesta:boolean=false;

  constructor(public formBuilder:FormBuilder, public crud:CrudService, private router:Router,private route: ActivatedRoute, private cookie:CookieService){
    this.exito = this.route.snapshot.queryParamMap.get('param') === 'true';

    this.formularioLogin = this.formBuilder.group({
      nick: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      pass1: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      });
  }

  enviar(){
    if (this.formularioLogin.valid) {
      let { nick, pass1} = this.formularioLogin.value;
      let pass = sha('sha256').update(pass1).digest('hex');

      this.crud.autenticarUsuario(nick,pass).subscribe(
        (response) => {
          if(response.token){
            this.cookie.set('token',response.token);
            this.router.navigate(["/main"]);
          }
        }
      );
    }
  }

  goToLanding(){
    this.router.navigate(["/"]);
  }
}
