import { Component } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Historial } from 'src/app/model/historial';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {

  nombre:string="";
  historial:Historial[]=[]

  constructor(private crud:CrudService, private route:ActivatedRoute, private router:Router){

    this.route.queryParams.subscribe(params => {
    this.nombre = params['param']});

    this.crud.informacionUsuario(this.nombre).subscribe(
      (response) => {
        this.historial=response;
      }
    );

  }

  goToMain(){
    this.router.navigate(["/main"]);
  }
}
