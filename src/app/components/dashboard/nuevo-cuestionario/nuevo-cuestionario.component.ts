import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QuizzService } from '../../../services/quizz.service';

@Component({
  selector: 'app-nuevo-cuestionario',
  templateUrl: './nuevo-cuestionario.component.html',
  styleUrls: ['./nuevo-cuestionario.component.sass']
})
export class NuevoCuestionarioComponent implements OnInit {

  cuestionarioForm:FormGroup;
  mostrarError=false;

  constructor(private fb:FormBuilder,
              private router:Router,
              private _quizzService:QuizzService) 
  {
    this.cuestionarioForm = this.fb.group({
      titulo: ['',Validators.required],
      descripcion:['',Validators.required], 
    })
  }

  ngOnInit(): void {
  }

  siguiente(){
    console.log(this.cuestionarioForm);
    if(this.cuestionarioForm.invalid){
      this.mostrarError=true;
      setTimeout(() => {
        this.mostrarError=false;
      }, 3000);
    }
    else{
      this._quizzService.tituloCuestionario=this.cuestionarioForm.get('titulo')?.value;
      this._quizzService.descripcion=this.cuestionarioForm.get('descripcion')?.value;
      this.router.navigate(['/dashboard/crear-preguntas']);
    }
  }
}
