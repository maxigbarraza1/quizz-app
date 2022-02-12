import { Respuesta } from './Respuesta.model';
export class Pregunta{
    titulo:string;
    puntos:number;
    segundos:number;
    listadoRespuestas: Respuesta[];
    constructor(titulo:string, puntos:number, segundos:number, listResp:Respuesta[]){
        this.titulo=titulo;
        this.puntos=puntos;
        this.segundos=segundos;
        this.listadoRespuestas=listResp;
    }
}