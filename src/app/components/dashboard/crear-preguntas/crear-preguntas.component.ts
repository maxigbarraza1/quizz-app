import { Component, OnInit } from '@angular/core';
import { QuizzService } from '../../../services/quizz.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-preguntas',
  templateUrl: './crear-preguntas.component.html',
  styleUrls: ['./crear-preguntas.component.sass']
})
export class CrearPreguntasComponent implements OnInit {
  
  agregarPregunta:FormGroup;
  checkBoxClasses:string[]=[];

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
