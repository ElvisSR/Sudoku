import { Component } from '@angular/core';
import { Cronometro } from 'src/app/model/cronometro';
import { Sudoku } from 'src/app/model/sudoku';

@Component({
  selector: 'app-main-guest',
  templateUrl: './main-guest.component.html',
  styleUrls: ['./main-guest.component.css']
})
export class MainGuestComponent {
  crono:Cronometro = new Cronometro();
  sudo:Sudoku = new Sudoku();
  tablero:number[][]=[];
  tableroSolucionado:number[][]=[];
  opcionSeleccionada: string =""
  numeros:number[]=[]
  numero:number = 0
  esperando:number=0;
  nombre:string="";
  fallos:number=0;
  maximosFallos:number=4;//Al cuarto fallo se termina la partida

  constructor(){
    this.numeros=this.sudo.mostrar_numeros();//Mostrar de primeras los números
  }

  resolver(){
    this.sudo.resolver();//Nos devuelve el sudoku resuelto
    alert("Abandonaste");
  }

  async generarSudoku(){
    this.fallos=0;
    this.esperando=1;
    await this.crono.esperaDe4Segundos();//Mientras se ejecute la cuanto a 4 no se sigue con lo demás
    this.esperando=2;
    this.sudo.generarSudoku(0.01);
    this.tableroSolucionado = this.sudo.mostrar_tableroSolucionado();
    this.tablero = this.sudo.mostrar_tablero();
  }

  //Guardamos la selección
  seleccionarNumero(numero: number) {
    this.numero = numero;
  }

  //Si la casilla está vacía, puedes poner números
  ponerNumero(fila: number, columna: number) {
    //Si el número en esa posición, es el mismo que en el de la solución
    if(this.tableroSolucionado[fila][columna]==this.numero){
      this.tablero[fila][columna] = this.numero;
      console.log(this.tablero);
      console.log(this.tableroSolucionado);
      if(this.sonIguales(this.tableroSolucionado,this.tablero)){
        alert("Ganaste");
      }
    }
    else{
      this.fallos++;
      if(this.fallos == this.maximosFallos){
        alert("Has alcanzado el máximo de fallos");
      }
    }
  }

  sonIguales(matriz1: number[][], matriz2: number[][]):boolean{
    return JSON.stringify(matriz1) === JSON.stringify(matriz2);
  }
}
