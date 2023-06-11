import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-navbar-registered',
  templateUrl: './navbar-registered.component.html',
  styleUrls: ['./navbar-registered.component.css']
})
export class NavbarRegisteredComponent {
  nombre:string="";

  constructor(private cookie:CookieService, private router:Router){
    let token = this.cookie.get('token');
    let decodeToken = jwt_decode(token) as { nick: string };
    this.nombre = decodeToken.nick;
  }

  goToLanding(){
    this.router.navigate([""]);
  }

  goToPerfil(){
    this.router.navigate(['perfil'], { queryParams: { param: this.nombre } });
  }
}
