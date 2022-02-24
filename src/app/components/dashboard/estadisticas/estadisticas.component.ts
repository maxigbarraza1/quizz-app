import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { RespuestaQuizzService } from '../../../services/respuesta-quizz.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.sass']
})
export class EstadisticasComponent implements OnInit,OnDestroy{
  id:string;
  loading:boolean=false;
  listRespuestasUsuario:any[]=[];
  respuestaQuizz:Subscription=new Subscription();


  constructor(private aRoute:ActivatedRoute,
              private _respuestaUsuarioService:RespuestaQuizzService,
              private toastr:ToastrService){
    this.id=this.aRoute.snapshot.paramMap.get('id')!;
    console.log(this.id)

  }

  ngOnInit(): void {
    this.getRespuestaByIdCuestionario();
  }

  ngOnDestroy(): void {
      this.respuestaQuizz.unsubscribe();
  }

  getRespuestaByIdCuestionario(){
    this.loading=true;

    this._respuestaUsuarioService.getRespuestaByIdCuestionario(this.id).subscribe(data=>{
      this.loading=false;
      this.listRespuestasUsuario=[];
      data.forEach((element:any) => {
        this.listRespuestasUsuario.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })

      });
      console.log(this.listRespuestasUsuario);
    },error=>{
      console.log(error);
    })
  }

  eliminarRespuestaUsuario(id:string){
    this.loading=true;
    this._respuestaUsuarioService.deleteRespuestaUsuario(id).then(()=>{
      this.loading=false;
      this.toastr.info('La respuesta fue eliminada', 'Respuesta eliminada')
    },error=>{
      console.log(error);
      this.toastr.error('Opss.. ocurrio un error', 'Error')
    })
  }
}
