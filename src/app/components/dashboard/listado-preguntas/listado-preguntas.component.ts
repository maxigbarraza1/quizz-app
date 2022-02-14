import { Component, OnInit } from '@angular/core';
import { QuizzService } from '../../../services/quizz.service';
import { Pregunta } from '../../../models/Preguntas.model';
import { Cuestionario } from '../../../models/Cuestionario.model';
import { Router } from '@angular/router';
import { nanoid } from 'nanoId';
import { User } from '../../../models/User.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listado-preguntas',
  templateUrl: './listado-preguntas.component.html',
  styleUrls: ['./listado-preguntas.component.sass']
})
export class ListadoPreguntasComponent implements OnInit {
  listPreguntas: Pregunta[]=[];
  tituloCuestionario:string;
  descripcionCuestionario:string;
  loading=false;

  constructor(private _quizzService:QuizzService,
              private router:Router,
              private toastr:ToastrService) 
  { 
    this._quizzService.getPregunta().subscribe(data=>{
      this.listPreguntas.push(data);
    })
    this.tituloCuestionario=this._quizzService.tituloCuestionario;
    this.descripcionCuestionario=this._quizzService.descripcion;
  }

  ngOnInit(): void {
    if(this.tituloCuestionario == '' || this.descripcionCuestionario== ''){
      this.router.navigate(['/dashboard']);
    }
  }


  eliminarPregunta(index:number){
    this.listPreguntas.splice(index,1);
  }

  finalizarCuestionario(){
    this.loading=true;
    const codigo=this.generarCodigo();
    const usuario: User = JSON.parse(localStorage.getItem('usuario') || '{}');    
    const cuestionario: Cuestionario={
      uID:usuario.uID,
      titulo:this.tituloCuestionario,
      descripcion:this.descripcionCuestionario,
      codigo:codigo,
      cantidadPreguntas: this.listPreguntas.length,
      fechaCreacion:new Date(),
      listPreguntas: this.listPreguntas,
    }
    console.log(cuestionario);
    this._quizzService.crearCuestionario(cuestionario).then(data=>{
      this.loading=false;
      this.toastr.success('El cuestionario fue registrado con exito','Cuestionario registrado')
      this.router.navigate(['/dashboard']);
    }).catch(error=>{
      this.loading=false;
      console.log(error);
    })

    
  }

  generarCodigo():string{
    return nanoid(6).toUpperCase();
  }
}
