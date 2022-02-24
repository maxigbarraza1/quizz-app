import { Component, OnInit } from '@angular/core';
import { RespuestaQuizzService } from '../../../services/respuesta-quizz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingresar-nombre',
  templateUrl: './ingresar-nombre.component.html',
  styleUrls: ['./ingresar-nombre.component.sass']
})
export class IngresarNombreComponent implements OnInit {
  nombre:string='';
  error:boolean=false;
  errorText:string='';
  constructor(private _respuestaQuizzService:RespuestaQuizzService,
              private router:Router) 
  { }

  ngOnInit(): void {
    this.validarRefresh();
  }

  ingresarNombre(){
    if(this.nombre===''){
      this.errorMensaje('Ingrese un nombre');
      return
    }
    this._respuestaQuizzService.nombreParticipante=this.nombre;
    this.router.navigate(['juego/iniciar-contador']);
  }

  validarRefresh(){
    if(this._respuestaQuizzService.cuestionario===undefined){
      this.router.navigate(['/'])
    }
  }

  errorMensaje(text:string){
    this.errorText=text;
    this.error=true;
    setTimeout(() => {
      this.error=false;
    }, 4000);
  }
}
