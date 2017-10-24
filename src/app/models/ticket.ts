/*
titulo:String,
descripcion:String,
fechaSolicitud:{ type: Date, default: Date.now },
modulo:{type:Schema.ObjectId,ref:'Modulo'},
sede:{type:Schema.ObjectId,ref:'Sede'},
estado:{type:Schema.ObjectId,ref:'Estado'},
importancia:{type:Schema.ObjectId,ref:'Importancia'},
tipo:{type:Schema.ObjectId,ref:'Tipo'}
*/
//import { Modulo,Sede,Estado,Importancia,Tipo } from "./models/";

import { Modulo } from "app/models/modulo";
import { Sede } from "app/models/sede";
import { Estado } from "app/models/estado";
import { Importancia } from "app/models/importancia";
import { Tipo } from "app/models/tipo";


export class Ticket {
  constructor(
    public _id: string,
    public titulo: string,
    public descripcion: string,
    public fechaSolicitud: Date,
    public modulo: Modulo,
    public sede: Sede,
    public estado: Estado,
    public importancia: Importancia,
    public tipo: Tipo
  ) {

  }
}