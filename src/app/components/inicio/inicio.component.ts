import { Component, OnInit, OnDestroy } from '@angular/core';
import { RespuestaQuizzService } from '../../services/respuesta-quizz.service';
import { Cuestionario } from '../../models/Cuestionario.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.sass']
})
export class InicioComponent implements OnInit, OnDestroy {

  error:boolean = false;
  errorText:string = '';
  pin:string = '';
  loading:boolean=false;
  subscriptionCode: Subscription = new Subscription();
  constructor(private respuestaQuizz:RespuestaQuizzService,
              private router:Router) 
  {

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
      this.subscriptionCode.unsubscribe();
  }

  ingresar(){
    if(this.pin==''){
      this.errorMensaje('Por favor ingrese un PIN');
      return
    }
    this.loading=true;
    this.subscriptionCode=this.respuestaQuizz.searchByCode(this.pin).subscribe(data=>{
      if(data.empty){
        this.errorMensaje('Por favor ingrese un PIN valido')
      }else{
        data.forEach((element:any) => {
          const cuestionario : Cuestionario = {
            id:element.id,
            ...element.data()
          }
          this.respuestaQuizz.cuestionario=cuestionario;
          this.router.navigate(['/juego'])
        });
      }
      this.loading=false;
    }, error=>{
      console.log('entro en error')
      console.log(error);
      this.loading=false;
    })
  }

  errorMensaje(text:string){
    this.errorText=text;
    this.error=true;
    this.pin='';
    setTimeout(() => {
      this.error=false;
    }, 4000);
  }
}
