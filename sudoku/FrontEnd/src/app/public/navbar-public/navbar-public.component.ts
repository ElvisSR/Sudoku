import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar-public',
  templateUrl: './navbar-public.component.html',
  styleUrls: ['./navbar-public.component.css']
})
export class NavbarPublicComponent {
  
  constructor(private router:Router){

  }

  goToLogin(){
    this.router.navigate(["login"]);
  }
}
