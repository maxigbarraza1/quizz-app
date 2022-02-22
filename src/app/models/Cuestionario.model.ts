import { Pregunta } from './Preguntas.model';
export class Cuestionario{
    id?:string;
    uID:string;
    titulo:string;
    descripcion:string;
    codigo:string;
    cantidadPreguntas:number;
    fechaCreacion:Date;
    listPreguntas: Pregunta[];

    constructor(uID:string,titulo:string,
                descripcion:string,codigo:string,
                cantidadPreguntas:number,fecha:Date, listPreguntas:Pregunta[]){
        this.uID=uID;
        this.titulo=titulo;
        this.descripcion=descripcion;
        this.codigo=codigo;
        this.cantidadPreguntas=cantidadPreguntas;
        this.fechaCreacion=fecha;
        this.listPreguntas=listPreguntas;
    }
}