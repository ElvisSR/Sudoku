import { Component } from '@angular/core';
import { Sudoku } from 'src/app/model/sudoku';


@Component({
  selector: 'app-sudoku',
  templateUrl: './sudoku.component.html',
  styleUrls: ['./sudoku.component.css']
})
export class SudokuComponent {
  sudo:Sudoku = new Sudoku();
  tablero:number[][];

  constructor(){
    this.tablero = this.sudo.mostrar_tablero();
  }

  resolver(){
    this.sudo.resolver();
  }
}
