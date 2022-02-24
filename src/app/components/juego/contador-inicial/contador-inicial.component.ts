import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contador-inicial',
  templateUrl: './contador-inicial.component.html',
  styleUrls: ['./contador-inicial.component.sass']
})
export class ContadorInicialComponent implements OnInit,OnDestroy {

  contador:number=5;
  setTnterval:any;

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.playContadorInicial();
  }
  
  ngOnDestroy(): void {
      clearInterval(this.setTnterval);
  }

  playContadorInicial(){
    setInterval(()=>{
      if(this.contador===0){
        this.router.navigate(['juego/realizar-quizz'])
      }
      this.contador=this.contador-1;
    },1000)

  }

}
