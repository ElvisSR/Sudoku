export class Sudoku
{
    tableroPortada : number[][];
    tablero : number[][] = [];
    numeros : number [] =[1,2,3,4,5,6,7,8,9]

    constructor(){
        this.limpiarSudoku();

        this.tableroPortada =[
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
        this.limpiarSudoku();
        this.generarCuadrante(3);
        this.generarCuadrante(6);
        this.generarCuadrante(9);
        this.resolver();
        this.generarVacios(dificultad);

    }

    generarCuadrante(num:number){
        for (let fila = num-3; fila < num; fila++) {
            for (let columna = num-3; columna < num; columna++) {
                let numero = Math.floor(Math.random() * 9) + 1;
                if(this.noBloque(fila,columna,numero)){
                    this.tablero[fila][columna] = numero;
                }
                else{
                    columna --;
                }

            }
        }
    }

    generarVacios(dificultad:number){
        for (let fila = 0; fila < this.tablero.length; fila++) {
            for (let columna = 0; columna < this.tablero[fila].length; columna++) {
                let ceros = Math.random()<dificultad;
                if(ceros){
                    this.tablero[fila][columna]=0
                }
            }
            
        }
    }

    // Funciones de resolución del sudoku
    public resolver():boolean{
        for (let fila = 0; fila < this.tablero.length; fila++) {
            for (let columna = 0; columna < this.tablero[fila].length; columna++) {
                if(this.tablero[fila][columna]==0){
                    for (let num = 0; num <= 9; num++) {
                        if(this.noBloque(fila,columna,num) && this.noFila(fila,num) && this.noColumna(columna,num)){
                            this.tablero[fila][columna] = num;
                            if(this.resolver()){
                                return true;
                            }
                            this.tablero[fila][columna] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    public noFila(fila:number,numero:number):boolean{
        for (let columna = 0; columna < this.tablero[fila].length; columna++) {
            if(this.tablero[fila][columna]==numero){
                return false;
            }
            
        }
        return true;
    }

    public noColumna(columna:number,numero:number):boolean{
        for (let fila = 0; fila < this.tablero.length; fila++) {
            if(this.tablero[fila][columna]==numero){
                return false;
            }
            
        }
        return true;
    }

    public noBloque(fila:number,columna:number,numero:number):boolean{
        let f = this.bloque(fila);
        let c = this.bloque(columna);

        for (let i = f-3; i < f; i++) {
            for (let j = c-3; j < c; j++) {
                if(this.tablero[i][j] == numero){
                    return false;
                }
            }     
        }
        return true;
    }

    public bloque(indice:number):number{
       switch (true) {
        case indice <= 2:
            return 3
        case indice <= 5:
            return 6;
        default:
            return 9;
       }
    }

    //Limpiar
    public limpiarSudoku(){
        for (let fila = 0; fila < 9; fila++) {
            this.tablero[fila] = new Array(9);
            for (let columna = 0; columna < 9; columna++){
                this.tablero[fila][columna]=0;
            }
        }
    }

    //Mostrar
    public mostrar_tableroPortada(){
        return this.tableroPortada;
    }

    public mostrar_tablero(){
        return this.tablero;
    }

    public mostrar_numeros(){
        return this.numeros;
    }
}