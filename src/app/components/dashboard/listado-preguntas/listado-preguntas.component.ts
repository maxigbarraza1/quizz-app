import { Component, OnInit } from '@angular/core';
import { QuizzService } from '../../../services/quizz.service';
import { Pregunta } from '../../../models/Preguntas.model';

@Component({
  selector: 'app-listado-preguntas',
  templateUrl: './listado-preguntas.component.html',
  styleUrls: ['./listado-preguntas.component.sass']
})
export class ListadoPreguntasComponent implements OnInit {
  listPreguntas: Pregunta[]=[];
  constructor(private _quizzService:QuizzService) 
  { 
    this._quizzService.getPregunta().subscribe(data=>{
      this.listPreguntas.push(data);
    })
  }

  ngOnInit(): void {
  }

}
