import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  error(code:string): string{
    switch(code){
      case 'auth/email-already-in-use':
        return 'El correo ya se esta registrado.';
      
      case 'auth/invalid-email':
        return 'El correo electronico ingresado es invalido.';
      
      case 'auth/weak-password':
        return 'La contraseña es muy debil.';

      case 'auth/user-not-found':
        return 'El usuario ingresado no se encuentra registrado.';

      case 'auth/wrong-password':
        return 'Contraseña incorrecta';
      
      
    
      default:
        return 'Error desconocido.';
    }
  }
}
