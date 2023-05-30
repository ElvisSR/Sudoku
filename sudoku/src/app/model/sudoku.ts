export class Sudoku
{
    tableroPortada : number[][]; //Tablero que uso para mi landing page
    tablero : number[][] = []; //Tablero en el cual se jugará
    tableroSolucionado : number[][] = [] //Tablero solucionado que me servirá para comparar y comprobar si introduce el número correcto
    numeros : number [] =[1,2,3,4,5,6,7,8,9] //Las opciones de números

    constructor(){
        this.tableroPortada =[ //Será un tablero que en un futuro cambiará cada x segundos en la landing page
            [0,0,6,8,0,0,0,9,4],
            [0,2,0,0,6,0,7,0,0],
            [7,0,0,4,0,2,0,0,0],
            [0,0,0,0,0,0,0,1,0],
            [6,4,0,0,2,8,3,5,0],
            [0,9,0,5,0,1,0,0,2],
            [4,0,2,6,0,3,0,0,5],
            [0,0,0,0,1,0,0,0,3],
            [8,0,9,0,0,0,1,2,0]
        ]
        
    }
    //Generar sudoku
    public generarSudoku(dificultad:number){
        this.limpiarSudoku(this.tablero); //Primero limpio el tablero
        //A continuación relleno los 3 cuadrantes en diagonal, es una forma que se utiliza para crear Sudokus
        this.generarCuadrante(3); 
        this.generarCuadrante(6);
        this.generarCuadrante(9);
        this.resolver(); //Resuelvo el tablero anterior
        this.generarVacios(dificultad); //Elimino del tablero resuelto tantos números como sea la dificultad

    }

    generarCuadrante(num:number){
        //Dependiendo de cada uno de los 3 cuadrantes recibiré un número que indicará la posición de cada uno
        for (let fila = num-3; fila < num; fila++) {//a la fila le resto 3 ya que el cuadrante es un 3x3
            for (let columna = num-3; columna < num; columna++) {//Hago lo mismo con la columna
                let numero = Math.floor(Math.random() * 9) + 1;//Genero un random del 1 al 9
                if(this.noBloque(fila,columna,numero)){//Si cumple con que no se repite en el bloque
                    this.tablero[fila][columna] = numero;//Relleno esa posición con el número
                }
                else{
                    columna --;//De lo contrario resto para no incrementar después la columna e intentarlo con otro número
                }

            }
        }
    }

    generarVacios(dificultad:number){
        //Recibo un número dependiendo de la dificultad y será el procentaje de probabilidades de ceros 
        for (let fila = 0; fila < this.tablero.length; fila++) {
            for (let columna = 0; columna < this.tablero[fila].length; columna++) {
                //El random me genera un número entre 0 y 1
                //Así que me devolverá true si genero una número menor a la dificultad
                //Fácil:0.5, medio:0.6, difícil:0.7
                let ceros = Math.random()<dificultad;
                if(ceros){//Si es menor iguale la posición a cero
                    this.tablero[fila][columna]=0
                }
            }
            
        }
    }

    // Funciones de resolución del sudoku
    public resolver():boolean{
        //Recorro el tablero a resolver condicionando según las reglas del sudoku y haciendo uso del backtraking
        for (let fila = 0; fila < this.tablero.length; fila++) {
            for (let columna = 0; columna < this.tablero[fila].length; columna++) {
                if(this.tablero[fila][columna]==0){
                    for (let num = 0; num <= 9; num++) {
                        if(this.noBloque(fila,columna,num) && this.noFila(fila,num) && this.noColumna(columna,num)){
                            this.tablero[fila][columna] = num;
                            //Ponemos num en esa posición y hacemos una llamada recursiva para saber si
                            //podemos seguir correctamente con el sudoku, de lo contrario irá hacia atrás y
                            //lo volverá a intentar con otro número
                            if(this.resolver()){
                                return true;
                            }
                            //Si no se cumple ponemos otra vez a 0 la posición 
                            this.tablero[fila][columna] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        /*Hago una copia profunda pasando a JSON this.tablero y luego crear un objeto para tener una copia independiente, 
        ya que si simplemente igualamos con this.tablero, estaremos apuntando al mismo bloque de memoria y cualquier
        modificación en this.tablero, lo reflejaremos en this.tableroSolucionado y no queremos eso*/
        this.tableroSolucionado = JSON.parse(JSON.stringify(this.tablero));
        return true;
    }

    //Comprobación de que el número no se encuentre en la fila
    public noFila(fila:number,numero:number):boolean{
        for (let columna = 0; columna < this.tablero[fila].length; columna++) {
            if(this.tablero[fila][columna]==numero){
                return false;
            }
            
        }
        return true;
    }

    //Comprobación de que el número no se encuentre en la columna
    public noColumna(columna:number,numero:number):boolean{
        for (let fila = 0; fila < this.tablero.length; fila++) {
            if(this.tablero[fila][columna]==numero){
                return false;
            }
            
        }
        return true;
    }

    //Comprobación de que el número no se encuentre en el bloque de 3x3
    public noBloque(fila:number,columna:number,numero:number):boolean{
        let f = this.bloque(fila);
        let c = this.bloque(columna);

        //Una vez sabemos el bloque en el que estamos según lo que nos devuelve el método bloque
        //Como nos devolverá el límite del bloque, retamos 3 para comprobar desde el principio dicho bloque
        for (let i = f-3; i < f; i++) {
            for (let j = c-3; j < c; j++) {
                if(this.tablero[i][j] == numero){
                    return false;
                }
            }     
        }
        return true;
    }

    //Saber en qué bloque estamos
    public bloque(indice:number):number{
        //Pasamos ya sea la fila o columna y según sea determinaremos el bloque en el que se encuentra
        switch (true) {
        case indice <= 2:
            return 3
        case indice <= 5:
            return 6;
        default:
            return 9;
        }
    }

    //Limpiamos rellenando a ceros el sudoku
    public limpiarSudoku(tablero:number[][]){
        for (let fila = 0; fila < 9; fila++) {
            tablero[fila] = new Array(9);
            for (let columna = 0; columna < 9; columna++){
                tablero[fila][columna]=0;
            }
        }
    }

    public mostrar_tableroPortada(){
        return this.tableroPortada;
    }

    public mostrar_tablero(){
        return this.tablero;
    }

    public mostrar_tableroSolucionado(){
        return this.tableroSolucionado;
    }

    public mostrar_numeros(){
        return this.numeros;
    }
}