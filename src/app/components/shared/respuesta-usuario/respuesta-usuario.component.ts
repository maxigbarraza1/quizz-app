import { Component, OnInit, OnDestroy } from '@angular/core';
import { RespuestaQuizzService } from '../../../services/respuesta-quizz.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-respuesta-usuario',
  templateUrl: './respuesta-usuario.component.html',
  styleUrls: ['./respuesta-usuario.component.sass']
})
export class RespuestaUsuarioComponent implements OnInit,OnDestroy {

  id:string='';
  loading:boolean=false;
  respUsuarioSubscription:Subscription= new Subscription();
  respuestaCuestionario:any;
  rutaAnterior='';

  constructor(private _respuestaQuizzService:RespuestaQuizzService,
              private aRoute:ActivatedRoute,
              private router:Router) 
  {
    this.id = this.aRoute.snapshot.paramMap.get('id')!; 
    console.log(this.aRoute.snapshot.url[0].path)
    this.rutaAnterior=this.aRoute.snapshot.url[0].path;
  }

  ngOnInit(): void {
    this.obtenerRespuestaUsuario();
  }

  ngOnDestroy(): void {
      this.respUsuarioSubscription.unsubscribe();
  }

  obtenerRespuestaUsuario(){
    this.loading=true;
    this.respUsuarioSubscription=this._respuestaQuizzService.getRespuestaUsuario(this.id).subscribe(doc=>{
      if(!doc.exists){
        this.volver();
        return
      }
      this.respuestaCuestionario=doc.data();
      this.loading=false;
    },error=>{
      console.log(error);
      this.loading=false;
    })
  }

  volver(){
    if(this.rutaAnterior == 'respuestaUsuarioAdmin'){
      this.router.navigate(['/dashboard/estadisticas',this.respuestaCuestionario.idCuestionario])
    }else{
      this.router.navigate(['/'])
    }
  }

}
