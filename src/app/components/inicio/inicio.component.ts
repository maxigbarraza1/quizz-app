import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.sass']
})
export class InicioComponent implements OnInit {

  error = false;
  pin = '';
  constructor() { }

  ngOnInit(): void {
  }

  ingresar(){
    if(this.pin==''){
      this.error=true;

      setTimeout(() => {
        this.error=false;
      }, 3000);
    }
  }

}
