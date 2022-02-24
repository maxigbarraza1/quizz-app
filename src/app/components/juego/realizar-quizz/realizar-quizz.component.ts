import { Component, OnInit, OnDestroy } from '@angular/core';
import { RespuestaQuizzService } from '../../../services/respuesta-quizz.service';
import { Cuestionario } from '../../../models/Cuestionario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-realizar-quizz',
  templateUrl: './realizar-quizz.component.html',
  styleUrls: ['./realizar-quizz.component.sass']
})
export class RealizarQuizzComponent implements OnInit, OnDestroy {

  cuestionario!: Cuestionario;
  nombreParticipante:string='';
  indexPregunta:number=0;
  segundos:number=0;
  setInterval:any;
  loading:boolean=false;

  //RespuestaUsuario
  opcionSeleccionada:any;
  indexSeleccionado:any;
  cantidadCorrectas:number=0;
  cantidadIncorrectas:number=0;
  puntajeTotal:number=0;
  listRespuestaUsuario:any[]=[];

  constructor(private _respuestaQuizzService:RespuestaQuizzService,
              private router:Router,
              ) 
  { }

  ngOnInit(): void {
    this.validateRefresh();
    this.cuestionario=this._respuestaQuizzService.cuestionario;
    this.nombreParticipante=this._respuestaQuizzService.nombreParticipante;
    this.iniciarContador();
  }

  ngOnDestroy(): void {
      clearInterval(this.setInterval);
  }

  validateRefresh(){
    if(this._respuestaQuizzService.cuestionario===undefined){
      this.router.navigate(['/']);
    }
  }

  getSegundos():number{
    return this.segundos;
  }

  getTitulo():string{
    return this.cuestionario.listPreguntas[this.indexPregunta].titulo;
  }

  iniciarContador(){
    this.segundos = this.cuestionario.listPreguntas[this.indexPregunta].segundos;
    this.setInterval=setInterval(()=>{
      if(this.segundos==0){
        this.indexPregunta++;
        clearInterval(this.setInterval);
        this.iniciarContador();
      }
      this.segundos=this.segundos-1;
    },1000)

  }

  respuestaSeleccionada(respuesta:any, indice:number){
    this.opcionSeleccionada=respuesta;
    this.indexSeleccionado=indice;
  }

  addClassOption(respuesta:any):string{
    if(respuesta===this.opcionSeleccionada){
      return 'classSeleccionada'
    }else{
      return ''
    }
  }

  siguientePregunta(){
    clearInterval(this.setInterval);
    this.agregarRespuesta()
    this.iniciarContador();
  }

  obtenerPuntaje():number{
    if(this.opcionSeleccionada === undefined){
      return 0;
    }
    const puntosPregunta = this.cuestionario.listPreguntas[this.indexPregunta].puntos
    if(this.opcionSeleccionada.esCorrecta == true){
      this.puntajeTotal = this.puntajeTotal + puntosPregunta;
      return puntosPregunta;
    }else{
      return 0;
    }
  }

  obtenerSegundos():string{
    if(this.opcionSeleccionada===undefined){
      return 'NO RESPONDIO'
    }else{
      const segundosTotales=this.cuestionario.listPreguntas[this.indexPregunta].segundos;
      const segundosRespondidos=segundosTotales-this.segundos;
      return segundosRespondidos.toString();
    }
  }

  obtenerIndiceSeleccionado():any{
    if(this.opcionSeleccionada===undefined){
      return ''
    }else{
      return this.indexSeleccionado;
    }
  }

  contadorCorrectaIncorrecta(){
    if(this.opcionSeleccionada===undefined){
      this.cantidadCorrectas++
      return
    }

    if(this.opcionSeleccionada.esCorrecta==false){
      this.cantidadIncorrectas++
    }else{
      this.cantidadCorrectas++
    }
  }

  
  agregarRespuesta(){
    this.contadorCorrectaIncorrecta();
    const respuestaUsuario:any ={
      titulo:this.cuestionario.listPreguntas[this.indexPregunta].titulo,
      puntosObtenidos:this.obtenerPuntaje(),
      segundos:this.obtenerSegundos(),
      indexRespuestaSeleccionada:this.obtenerIndiceSeleccionado(),
      listRespuestas:this.cuestionario.listPreguntas[this.indexPregunta].listadoRespuestas,
    }
    this.listRespuestaUsuario.push(respuestaUsuario);
    this.opcionSeleccionada=undefined;
    this.indexSeleccionado=undefined;
    //Validar el rango de la ultima pregutna
    if(this.cuestionario.listPreguntas.length-1 === this.indexPregunta){
      //guardar las respuestas en la BD
      this.guardarRespuestasCuestionario();

      //redireccionamos al proximo componente
      
    }else{
      this.indexPregunta++;
      this.segundos=this.cuestionario.listPreguntas[this.indexPregunta].segundos;
    }
  }
  
  guardarRespuestasCuestionario(){
    this.loading=true;
    const respuestaCuestionario:any = {
      idCuestionario: this.cuestionario.id,
      nombreParticipante: this.nombreParticipante,
      fecha: new Date(),
      cantidadPreguntas:this.cuestionario.cantidadPreguntas,
      cantidadCorrectas:this.cantidadCorrectas,
      cantidadIncorrectas:this.cantidadIncorrectas,
      puntosTotales:this.puntajeTotal,
      listRespuestaUsuario:this.listRespuestaUsuario
    }
    
    //Almacenamos la respuesta en la BD
    this._respuestaQuizzService.setRespuestaUsuario(respuestaCuestionario).then(data=>{
      this.loading=false;
      this.router.navigate(['/juego/respuestas', data.id]);
    }, error=>{
      console.log(error);
      this.loading=false
      this.router.navigate(['/']);
    })
  }
}
