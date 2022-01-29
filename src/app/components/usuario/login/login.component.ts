import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ErrorService } from '../../../services/error.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading=false;

  constructor(private fb:FormBuilder,
              private afAuth:AngularFireAuth,
              private _errorService:ErrorService,
              private toastr:ToastrService,
              private router:Router) 
  {
    this.loginForm = this.fb.group({
      usuario: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  login(){
    const user=this.loginForm.get('usuario')?.value;
    const password=this.loginForm.get('password')?.value;
    this.loading=true;
    this.afAuth.signInWithEmailAndPassword(user,password).then(
      resp=>{
        console.log(resp);
        this.loading=false;
        if(resp.user?.emailVerified){
          // this.router.navigate(['/usuario']);

        }else{
          this.router.navigate(['/usuario/verificarCorreo']);

        }
        this.toastr.success('Recuerda que solo es un juego', '¡Bienvenido!');
      }).catch(error=>{
        this.loading=false;
        this.toastr.error(this._errorService.error(error.code), '¡Opss ocurrio un error!');
        this.loginForm.reset();
        console.log(error);
    })


  }

}
