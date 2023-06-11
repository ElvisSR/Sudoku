import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Cronometro } from 'src/app/model/cronometro';
import { Sudoku } from 'src/app/model/sudoku';
import jwt_decode from 'jwt-decode';
import { CrudService } from 'src/app/services/crud.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-main-sudoku',
  templateUrl: './main-sudoku.component.html',
  styleUrls: ['./main-sudoku.component.css']
})
export class MainSudokuComponent {
  
  crono:Cronometro = new Cronometro();
  sudo:Sudoku = new Sudoku();
  tiempo:string="";
  tablero:number[][]=[];
  tableroSolucionado:number[][]=[];
  opcionSeleccionada: string =""
  numeros:number[]=[]
  numero:number = 0
  esperando:number=0;
  scoreFallos:number=0;
  derrota:number=0;
  nombre:string="";
  fallos:number=0;
  maximosFallos:number=4;//Al cuarto fallo se termina la partida

  constructor(private cookie:CookieService, private crud:CrudService, private router:Router){
    this.numeros=this.sudo.mostrar_numeros();//Mostrar de primeras los números

    //Problemas  ala hora de decodificar el jwt token en el php, por eso l odecodifico en el front-end aunque no sea recomendable
    let token = this.cookie.get('token');
    let decodeToken = jwt_decode(token) as { nick: string };
    this.nombre = decodeToken.nick;
  }

  resolver(){
    if(!this.sonIguales(this.tablero,this.tableroSolucionado)){
      this.derrota=1;
      this.scoreFallos=0;
      this.crono.detener();
      this.sudo.resolver();//Nos devuelve el sudoku resuelto
      let dificultad = (document.getElementById("miDificultad") as HTMLSelectElement).value;
      let fallos = this.fallos.toString();
      this.crud.insertarHistorial(this.nombre,"Derrota",dificultad,fallos,this.tiempo).subscribe();
    }
  }

  async generarSudoku(){
    this.derrota=0;
    this.crono.detener();
    this.fallos=0;
    this.esperando=1;
    await this.crono.esperaDe4Segundos();//Mientras se ejecute la cuanto a 4 no se sigue con lo demás
    this.esperando=2;
    this.scoreFallos=2;
    
    let select = document.getElementById('miDificultad') as HTMLSelectElement;
    let dificultad = select.value;//Sacamos el valor seleccionado del select

    switch (dificultad) {
      //Dependiendo de la dificultad, genero un sudoku pasando el número oportuno, guardo el tablero solucionado
      //Mostramos el tablero en el que jugará el cliente
      case "facil":
        this.sudo.generarSudoku(0.06);
        this.tableroSolucionado = this.sudo.mostrar_tableroSolucionado();
        this.tablero = this.sudo.mostrar_tablero();
        break;
      case "medio":
        this.sudo.generarSudoku(0.6);
        this.tableroSolucionado = this.sudo.mostrar_tableroSolucionado();
        this.tablero = this.sudo.mostrar_tablero();
        break;
      case "dificil":
        this.sudo.generarSudoku(0.7);
        this.tableroSolucionado = this.sudo.mostrar_tableroSolucionado();
        this.tablero = this.sudo.mostrar_tablero();
        break;
      default:
        break;
    }

    //Iniciamos crono
    this.crono.reset();
    this.crono.iniciar();
    //Recogemos el tiempo actualizado suscrbiéndonos al emit desde Cronometro y se mantiene actualizado
    this.crono.tiempoActualizado.subscribe((tiempo: string) => {
    this.tiempo = tiempo;});
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
        //Utilizo setTimeout para asgeurarme de que el crono se detendrá
        //Si llamo directamente a this.crono.detener() no se ejecuta
        setTimeout(() => {
          this.crono.detener();
        });
        let dificultad = (document.getElementById("miDificultad") as HTMLSelectElement).value;
        let fallos = this.fallos.toString();
        this.crud.insertarHistorial(this.nombre,"Victoria",dificultad,fallos,this.tiempo).subscribe();
      }
    }
    else{
      this.fallos++;
      if(this.fallos == this.maximosFallos){
        this.resolver();
        this.crono.detener();
        this.scoreFallos=0;
        let dificultad = (document.getElementById("miDificultad") as HTMLSelectElement).value;
        let fallos = this.fallos.toString();
        this.crud.insertarHistorial(this.nombre,"Derrota",dificultad,fallos,this.tiempo).subscribe();
      }
    }
  }

  sonIguales(matriz1: number[][], matriz2: number[][]):boolean{
    return JSON.stringify(matriz1) === JSON.stringify(matriz2);
  }

  goToLanding(){
    this.cookie.delete('token');
    this.router.navigate(["/"]);
  }
}


