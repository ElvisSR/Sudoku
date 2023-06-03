import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  exito:boolean=false;

  constructor(private router:Router,private route: ActivatedRoute){
    this.exito = this.route.snapshot.queryParamMap.get('param') === 'true';
  }

  goToMain(){
    this.router.navigate(["main"])
  }
}
