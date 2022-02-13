import { Component, OnInit } from '@angular/core';
import { QuizzService } from '../../../services/quizz.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Respuesta } from '../../../models/Respuesta.model';
import { Pregunta } from '../../../models/Preguntas.model';

@Component({
  selector: 'app-crear-preguntas',
  templateUrl: './crear-preguntas.component.html',
  styleUrls: ['./crear-preguntas.component.sass']
})
export class CrearPreguntasComponent implements OnInit {
  
  agregarPregunta:FormGroup;
  checkBoxClasses:string[]=[];

  mostrarError=false;

  constructor(private _quizzService:QuizzService, private fb:FormBuilder) 
  { 
    this.agregarPregunta=this.fb.group({
      titulo: ['',Validators.required],
      segundos:[10, Validators.required],
      puntos:[1000, Validators.required],
      respuesta1:this.fb.group({
        titulo:['',Validators.required],
        esCorrecta:[false,Validators.required]
      }),
      respuesta2:this.fb.group({
        titulo:['',Validators.required],
        esCorrecta:[false,Validators.required]
      }),
      respuesta3:this.fb.group({
        titulo:'',
        esCorrecta:[false],
      }),
      respuesta4:this.fb.group({
        titulo:'',
        esCorrecta:[false],
      }),
    })
  }

  ngOnInit(): void {
    this.checkBoxClasses = ['far fa-circle']
  }

  get seg(){return this.agregarPregunta.get('segundos')?.value};
  get puntos(){return this.agregarPregunta.get('puntos')?.value};

  agregarNuevaPregunta(){
    console.log(this.agregarPregunta);
    if(this.agregarPregunta.invalid || this.todasIncorrectas()){
      this.error();
      return;
    }
    let listRespuestas: Respuesta[]=[];
    
    const rta1 = this.getRespuestParticular('respuesta1')
    listRespuestas.push(rta1);
    const rta2 = this.getRespuestParticular('respuesta2')
    listRespuestas.push(rta2);
    const rta3 = this.getRespuestParticular('respuesta3')
    if(rta3.descripcion!==''){
      listRespuestas.push(rta3)
    }
    const rta4 = this.getRespuestParticular('respuesta4')
    if(rta4.descripcion!==''){
      listRespuestas.push(rta4)
    }
    //Generamos el objeto pregunta
    const titulo = this.agregarPregunta.get('titulo')?.value;
    const tiempo = this.agregarPregunta.get('segundos')?.value;
    const puntaje = this.agregarPregunta.get('puntos')?.value;

    const nuevaPregunta : Pregunta={
      titulo:titulo,
      segundos:tiempo,
      puntos:puntaje,
      listadoRespuestas: listRespuestas,
    }

    this._quizzService.setPregunta(nuevaPregunta);
    this.resetForm();
  }

  resetForm(){
    this.agregarPregunta.patchValue({
      titulo:'',
      segundos:10,
      puntos:1000,
      respuesta1: {
        titulo:'',
        esCorrecta:false,
      },
      respuesta2: {
        titulo:'',
        esCorrecta:false,
      },
      respuesta3: {
        titulo:'',
        esCorrecta:false,
      },
      respuesta4: {
        titulo:'',
        esCorrecta:false,
      },
    })
  }

  getRespuestParticular(resp:string):Respuesta{
    const titulo = this.agregarPregunta.get(resp)?.get('titulo')?.value;
    const valor = this.agregarPregunta.get(resp)?.get('esCorrecta')?.value;
    const respuesta: Respuesta ={
      descripcion:titulo,
      esCorrecta:valor
    }
    return respuesta;
  }

  todasIncorrectas(){
    const respuestas = ['respuesta1','respuesta2','respuesta3','respuesta4'];
    for(let index=0; index<respuestas.length; index++){
      if(this.agregarPregunta. get(respuestas[index])?.get('esCorrecta')?.value){
        return false;
      }
    }
    return true;
  }

  error(){
      this.mostrarError=true;
      //Se muestra el error por 3segunds
      setTimeout(() => {
        this.mostrarError=false;
      }, 3000);
  }

  sumarRestarSegundos(n:number){
    let aux=this.seg
    if(aux + n <= 4 || aux + n >=21){
      return
    }
    this.agregarPregunta.patchValue({
      segundos: this.seg + n
    })
  }

  esCorrecta(valor:string){
    let nRespuesta="respuesta"+valor;
    this.setRespuestasFalsas(nRespuesta);
    const estadoRta=this.obtenerEstadoRespuesta(nRespuesta);
    this.agregarPregunta.get(nRespuesta)?.patchValue({
      esCorrecta: !estadoRta
    })
  }

  obtenerEstadoRespuesta(resp:string):boolean{
    return this.agregarPregunta.get(resp)?.get('esCorrecta')?.value;
  }

  setRespuestasFalsas(respuesta:string){
    const resp=['respuesta1','respuesta2','respuesta3','respuesta4'];
    resp.forEach(element => {
      if(element != respuesta){
        this.agregarPregunta.get(element)?.patchValue({
          esCorrecta:false
        })
      }
    });
  }
}
