import { EventEmitter } from '@angular/core';

export class Cronometro {
  inicio: number;//El tiempo de inicio al momento actual
  tiempo: string;//El mensaje completo del tiempo transcurrido
  funcionando: boolean;//Si está o no en marcha el cronómetro
  //Instancio la clase EventEmitter ya que permiti emitir eventos 
  ahora:number;
  temporizador:any;
  tiempoActualizado: EventEmitter<string> = new EventEmitter<string>();
  
  constructor(){
      this.inicio=0;
      this.ahora=0;
      this.tiempo="";
      this.funcionando=false;

  }

  public iniciar(){
    this.inicio=Date.now();
    this.cronometro();
  }

  public cronometro() {
        this.funcionando = true;
        this.ahora = Date.now();
        let transcurrido = this.ahora - this.inicio;//Diferencia entre el tiempo de ahora con el que se estableció en this.inicio
        //En milisegundos
        let segundos = Math.floor((transcurrido / 1000) % 60);//Hacemos el modulo de 60 para que no pase de 60
        let minutos = Math.floor((transcurrido / (1000 * 60)) % 60);
        let horas = Math.floor(minutos / 60);

        //Convierto a caracteres y con padStart me aseguro de que mínimo la cadena tendrá 2 ceros
        let segundosFormateados = segundos.toString().padStart(2, '0');
        let minutosFormateados = minutos.toString().padStart(2, '0');
        let horasFormateadas = horas.toString().padStart(2, '0');

        this.tiempo = horasFormateadas+":"+minutosFormateados+":"+segundosFormateados;//Mensaje del tiempo
  
        this.tiempoActualizado.emit(this.tiempo);//Envío cada segundo el valor de this.tiempo

        //Esta sintaxis nos va a permitir crear una funcion de arrow
        //Que nos permite actuar en un contexto actualizado respecto a this.iniciar
        //Y evitarnos posibles referencias a variables pasadas
        //Funcion que llama a this.iniciar cada segundo
        this.temporizador=setTimeout(() => {
          this.cronometro();
        }, 1000);
  }

  esperaDe4Segundos(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => { 
        resolve();
      }, 3000);
    });
  }

  public reset(){
    if (this.funcionando) {//Si está en funcionamiento pues se vuelve a la hora actual y reinicia
      this.inicio = Date.now();
      this.ahora = Date.now();
      // this.tiempo = "";
      this.funcionando = false;
    }
  }

  public detener() {
    clearTimeout(this.temporizador);
    this.funcionando = false;
  }

  public mostrarTiempo(){
    return this.tiempo;//Reflejar el tiempo en la pantalla
  }
}