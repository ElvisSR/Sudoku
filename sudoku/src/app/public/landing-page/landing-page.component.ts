import { Component } from '@angular/core';
import { Sudoku } from 'src/app/model/sudoku';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
  sudo:Sudoku = new Sudoku();
  tablero:number[][];

  constructor(){
    this.tablero = this.sudo.mostrar_tablero();
  }
}
