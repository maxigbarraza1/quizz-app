import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Pregunta } from '../models/Preguntas.model';
import { Cuestionario } from '../models/Cuestionario.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class QuizzService {
  tituloCuestionario:string='';
  descripcion:string='';
  private pregunta$ = new Subject<Pregunta>()
  constructor(private _firestore:AngularFirestore) { }

  setPregunta(pregunta:Pregunta){
    this.pregunta$.next(pregunta);
  }

  getPregunta(): Observable<Pregunta>{
    return this.pregunta$.asObservable();
  }

  crearCuestionario(cuestionario:Cuestionario):Promise<any>{
    return this._firestore.collection('cuestionarios').add(cuestionario);
  }
}
