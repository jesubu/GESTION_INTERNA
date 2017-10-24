import { Injectable } from '@angular/core';
import {Http,Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import {Subject} from 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {Tipo} from '../models/tipo';

@Injectable()
export class TipoService {

 public url:string;
 public reload:boolean;
 public oEdicion: Tipo;
 public idSel:string;
 
  constructor(private _http:Http) {
    this.url='http://localhost:3678/api/';
    this.reload=false;
   }
  getTipoByID(id){
    return this._http.get(this.url+'tipo/'+id)
                      .map(res=>res.json());
  }

  getTipos(){
    debugger;
    return this._http.get(this.url+'tipos')
                      .map(res=>res.json());
  }

  addTipo(tipo:Tipo){
    let json=JSON.stringify(tipo);
    let params=json;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.url+'tipo',params,options)
                      .map(res=>res.json());
  }

  updateTipo(tipo:Tipo){
    let json=JSON.stringify(tipo);
    let params=json;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.put(this.url+'tipo/'+tipo._id,params,options)
                      .map(res=>res.json());
  }

  removeTipo(id:string){

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.delete(this.url+'tipo/'+id)
                      .map(res=>res.json());
  }

}
