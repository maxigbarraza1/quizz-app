import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from '../../../services/error.service';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.sass']
})
export class RecuperarPasswordComponent implements OnInit {

  recuperarForm:FormGroup;
  loading=false;

  constructor(private fb: FormBuilder,
              private afAauth:AngularFireAuth,
              private router:Router,
              private toastr: ToastrService,
              private _errorService:ErrorService) {
    this.recuperarForm=this.fb.group({
      usuario: ['',[Validators.required, Validators.email]]
    })
  }

  ngOnInit(): void {
  }

  recuperarPassword(): void{
    const correo = this.recuperarForm.get('usuario')?.value;
    this.loading=true;
    this.afAauth.sendPasswordResetEmail(correo).then(()=>{
      this.toastr.info('Enviamos un correo electronico para restablecer la contraseña','Restablecer contraseña');
      this.router.navigate(['/usuario']);
    }).catch(error=>{
      this.loading=true;
      this.toastr.error(this._errorService.error(error.code), 'Error');
      this.recuperarForm.reset();

    })
  }

}
