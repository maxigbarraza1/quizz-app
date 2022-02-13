import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Pregunta } from '../models/Preguntas.model';

@Injectable({
  providedIn: 'root'
})
export class QuizzService {
  tituloCuestionario:string='';
  descripcion:string='';
  private pregunta$ = new Subject<Pregunta>()
  constructor() { }

  setPregunta(pregunta:Pregunta){
    this.pregunta$.next(pregunta);
  }

  getPregunta(): Observable<Pregunta>{
    return this.pregunta$.asObservable();
  }
}
