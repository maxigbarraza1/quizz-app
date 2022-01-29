import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';

import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from '../../../services/error.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;

  constructor(private fb:FormBuilder, 
              private afAauth:AngularFireAuth,
              private router:Router,
              private toastr: ToastrService,
              private _errorService:ErrorService) 
  {
    this.registerForm = this.fb.group({
      usuario: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repetirPassword: ['']
    },{validator: this.checkpassword})
  }

  ngOnInit(): void {
  }

  
  checkpassword(group: FormGroup){
    const pass = group.controls['password']?.value;
    const confirmPassword = group.controls['repetirPassword']?.value;
    return pass===confirmPassword ? null : {notSame: true};
  }
  
  registrarUsuario():void{
    const user = this.registerForm.get('usuario')?.value;
    const password = this.registerForm.get('password')?.value;
    this.loading=true;
    this.afAauth.createUserWithEmailAndPassword(user,password).then(
      resp=>{
        this.router.navigate(['/usuario']);
        this.toastr.success('Recuerda revisar su casilla de correo para verificar su cuenta.', '¡Usuario registrado con exito!');
        resp.user?.sendEmailVerification();
      }
    ).catch(error=>{
      this.loading=false;
      this.toastr.error(this._errorService.error(error.code), '¡Opss ocurrio un error!');
      this.registerForm.reset();
    });
  }
}
