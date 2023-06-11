import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { hashSync} from 'bcryptjs';
import { Usuario } from 'src/app/model/usuario';
import { CrudService } from 'src/app/services/crud.service';
import { Router } from '@angular/router';
import * as sha from 'sha.js';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent {
  formularioRegistro:FormGroup;
  respuesta:boolean=false;
  error:boolean=false;
  mensaje:string="";

  constructor(public formBuilder:FormBuilder, public crud:CrudService, private router:Router){
    this.formularioRegistro = this.formBuilder.group({
      nick: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      pass1: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      pass2: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      }, { validator: this.passwordEquals });
  }

  passwordEquals(formGroup: FormGroup) {
    let password1 = formGroup.get('pass1')?.value;// ? es para evitar que se produzca un error si es nulo
    let password2 = formGroup.get('pass2')?.value;
  
    if (password1 !== password2) {
      formGroup.get('pass2')?.setErrors({ passError: true });
    } else {
      formGroup.get('pass2')?.setErrors(null);
    }
  }

  enviar(){
    if (this.formularioRegistro.valid) {
      let { nick, email, pass1} = this.formularioRegistro.value;// Recupero 3 de los 4 inputs del formulario
      let pass = sha('sha256').update(pass1).digest('hex');
      let nuevoUsuario = new Usuario(nick, email, pass);

      this.crud.agregarUsuario(nuevoUsuario).subscribe(
        (response) => {
          this.respuesta=true;
          if(response=="exito"){
            this.router.navigate(["/login"]);
          }
          if(response=="existe"){
            this.mensaje="El nombre de usuario ya existe";
          }
        }
      );
    }
  }

  goToLanding(){
    this.router.navigate(["/"]);
  }
}
