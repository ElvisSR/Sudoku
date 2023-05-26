import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Sudoku } from 'src/app/model/sudoku';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
  sudo:Sudoku = new Sudoku();
  tablero:number[][];

  constructor(private router:Router){
    this.tablero = this.sudo.mostrar_tablero();
  }

  goToRegistration(){
    this.router.navigate(["registration"]);
  }
}
