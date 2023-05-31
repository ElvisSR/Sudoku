import { Component } from '@angular/core';
import { Cronometro } from 'src/app/model/cronometro';
import { Sudoku } from 'src/app/model/sudoku';

@Component({
  selector: 'app-sudoku',
  templateUrl: './sudoku.component.html',
  styleUrls: ['./sudoku.component.css']
})
export class SudokuComponent {
  crono:Cronometro = new Cronometro();
  sudo:Sudoku = new Sudoku();
  tiempo:String="";
  tablero:number[][]=[];
  tableroSolucionado:number[][]=[];
  opcionSeleccionada: string =""
  numeros:number[]=[]
  numero:number = 0

  constructor(){
    this.numeros=this.sudo.mostrar_numeros();//Mostrar de primeras los números
  }

  resolver(){
    this.sudo.resolver();//Nos devuelve el sudoku resuelto
  }

  generarSudoku(){
    let select = document.getElementById('miDificultad') as HTMLSelectElement;
    let dificultad = select.value;//Sacamos el valor seleccionado del select
    this.crono.detener();

    switch (dificultad) {
      //Dependiendo de la dificultad, genero un sudoku pasando el número oportuno, guardo el tablero solucionado
      //Mostramos el tablero en el que jugará el cliente
      //Iniciamos crono
      case "facil":
        this.sudo.generarSudoku(0.5);
        this.tableroSolucionado = this.sudo.mostrar_tableroSolucionado();
        this.tablero = this.sudo.mostrar_tablero();
        this.crono.iniciar();
        //Recogemos el tiempo actualizado suscrbiéndonos al emit desde Cronometro y se mantiene actualizado
        this.crono.tiempoActualizado.subscribe((tiempo: string) => {
        this.tiempo = tiempo;});
        
        break;
      case "medio":
        this.sudo.generarSudoku(0.6);
        this.tableroSolucionado = this.sudo.mostrar_tableroSolucionado();
        this.crono.iniciar();
        this.crono.tiempoActualizado.subscribe((tiempo: string) => {
        this.tiempo = tiempo;});
        break;
      case "dificil":
        this.sudo.generarSudoku(0.7);
        this.tableroSolucionado = this.sudo.mostrar_tableroSolucionado();
        this.crono.iniciar();
        this.crono.tiempoActualizado.subscribe((tiempo: string) => {
        this.tiempo = tiempo;});
        break;
      default:
        break;
    }
  }

  //GUardamos la selección
  seleccionarNumero(numero: number) {
    this.numero = numero;
  }

  //Si la casilla está vacía, puedes poner números
  ponerNumero(fila: number, columna: number) {
    if (this.numero>0) {
      //Si el número en esa posición, es el mismo que en el de la solución
      if(this.tableroSolucionado[fila][columna]==this.numero){
        this.tablero[fila][columna] = this.numero;
      }
      else{
        alert("Número incorrecto")
      }
    }
  }
}
