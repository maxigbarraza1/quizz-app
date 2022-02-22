import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cuestionario } from 'src/app/models/Cuestionario.model';
import { QuizzService } from '../../../services/quizz.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cuestionarios',
  templateUrl: './cuestionarios.component.html',
  styleUrls: ['./cuestionarios.component.sass']
})
export class CuestionariosComponent implements OnInit, OnDestroy {

  subscriptionUser:Subscription = new Subscription();
  subscriptionQuizz:Subscription = new Subscription();
  listCuestionarios:Cuestionario[]=[];
  loading=false;
  constructor(private afAuth: AngularFireAuth,
              private router: Router,
              private _quizzService: QuizzService,
              private toastr:ToastrService) 
    { 

    }

  ngOnInit(): void {
    this.loading=true;
    this.subscriptionUser = this.afAuth.user.subscribe(user=>{
      if(user && user.emailVerified){
        this.getCuestionarios(user.uid);
      }else{
        this.router.navigate(['/inicio']);
      }
    })
  }

  ngOnDestroy(): void {
    this.subscriptionUser.unsubscribe();
    this.subscriptionQuizz.unsubscribe();
  }

  getCuestionarios(uID:string){
    this.subscriptionQuizz = this._quizzService.getCuestionariosByIdUser(uID).subscribe(data=>{
      this.listCuestionarios=[];
      data.forEach((element:any) => {
        this.listCuestionarios.push({
          id:element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      this.loading=false;
    }, error=>{
      console.log(error);
      this.loading=false;
    })
  }

  eliminarCuestionario(idCuestionario:string){
    this.loading=true;
    this._quizzService.eliminarCuestionario(idCuestionario).then(data=>{
      this.toastr.success('El cuestionario fue eliminado con exito', 'Cuestionario eliminado');
      this.loading=true;
    }).catch(()=>{
      this.toastr.error('Opss.. ocurrio un error', 'Error');
      this.loading=true;
    })
  }

  
}
