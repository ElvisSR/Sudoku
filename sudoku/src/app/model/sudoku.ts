export class Sudoku
{
    tablero : number[][];
    
    constructor(){
        // this.tablero = new Array (9);
        // for (let fila = 0; fila < 9; fila++) {
        //     this.tablero[fila] = new Array(9);
        //     for (let columna = 0; columna < 9; columna++){
        //         this.tablero[fila][columna]=0;
        //     }
        // }
        this.tablero =[
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
        if(indice<=2){
            return 3;
        }
        else if(indice<=5){
            return 6;
        }
        else{
            return 9;
        }
    //    switch (true) {
    //     case indice <= 2:
    //         return 3
    //     case indice <= 5:
    //         return 6;
    //     default:
    //         return 9;
    //    }
    }
    public mostrar_tablero(){
        return this.tablero;
    }
}