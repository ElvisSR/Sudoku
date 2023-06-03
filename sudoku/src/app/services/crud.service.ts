import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Usuario } from '../model/usuario';


@Injectable({
  providedIn: 'root'
})

export class CrudService {

  url: string ="http://localhost/api/usuarios.php";

  constructor(private peticion:HttpClient) { }


  agregarUsuario(usuario:Usuario): Observable<any> {
    return this.peticion.post(this.url + "?agregar=",usuario ).pipe(
      catchError(error => throwError(() => new Error('Ha ocurrido un error.')))
    );
  }

  
}
