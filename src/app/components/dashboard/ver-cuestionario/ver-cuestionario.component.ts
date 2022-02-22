import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizzService } from '../../../services/quizz.service';
import { Cuestionario } from '../../../models/Cuestionario.model';

@Component({
  selector: 'app-ver-cuestionario',
  templateUrl: './ver-cuestionario.component.html',
  styleUrls: ['./ver-cuestionario.component.sass']
})
export class VerCuestionarioComponent implements OnInit {
  id: string;
  loading=false;
  cuestionario: Cuestionario | undefined;
  constructor(private _quizzService:QuizzService,
              private aRoute:ActivatedRoute,
             ) 
  {
    this.id=this.aRoute.snapshot.paramMap.get('id') || '';
  }

  ngOnInit(): void {
    this.obtenerQuizz();
  }

  obtenerQuizz(){
    this.loading=true;
    this._quizzService.getCuestionario(this.id).subscribe(doc=>{
      this.cuestionario=doc.data();
      this.loading=false;
    },error=>{
      console.log(error);
      this.loading=false;
    }
    )
  }
}
