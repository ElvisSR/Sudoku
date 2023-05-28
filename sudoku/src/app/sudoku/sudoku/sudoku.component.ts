import { Component } from '@angular/core';
import { Sudoku } from 'src/app/model/sudoku';


@Component({
  selector: 'app-sudoku',
  templateUrl: './sudoku.component.html',
  styleUrls: ['./sudoku.component.css']
})
export class SudokuComponent {
  sudo:Sudoku = new Sudoku();
  tablero:number[][]=[];
  opcionSeleccionada: string =""
  numeros:number[]=[]
  numero:number = 0
  constructor(){
    this.numeros=this.sudo.mostrar_numeros();
  }

  resolver(){
    this.sudo.resolver();
  }

  generarSudoku(){
    let select = document.getElementById('mySelect') as HTMLSelectElement;
    let dificultad = select.value;
      
    switch (dificultad) {
      case "facil":
        this.sudo.generarSudoku(0.5);
        this.tablero = this.sudo.mostrar_tablero();
        break;
      case "medio":
        this.sudo.generarSudoku(0.6);
        this.tablero = this.sudo.mostrar_tablero();
        break;
      case "dificil":
        this.sudo.generarSudoku(0.7);
        this.tablero = this.sudo.mostrar_tablero();
        break;
      default:
        break;
    }
  }

  seleccionarNumero(numero: number) {
    this.numero = numero;
  }

  ponerNumero(fila: number, columna: number) {
    if (this.numero>0) {
      this.tablero[fila][columna] = this.numero;
    }
  }
}
