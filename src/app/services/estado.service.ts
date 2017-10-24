import { Injectable } from '@angular/core';
import {Http,Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import {Subject} from 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {Estado} from '../models/estado';

@Injectable()
export class EstadoService {

 public url:string;
 public reload:boolean;
 public oEdicion: Estado;
 public idSel:string;
 
  constructor(private _http:Http) {
    this.url='http://localhost:3678/api/';
    this.reload=false;
   }
  getEstadoByID(id){
    return this._http.get(this.url+'estado/'+id)
                      .map(res=>res.json());
  }

  getEstados(){
    //debugger;
    return this._http.get(this.url+'estados')
                      .map(res=>res.json());
  }

  addEstado(estado:Estado){
    let json=JSON.stringify(estado);
    let params=json;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.url+'estado',params,options)
                      .map(res=>res.json());
  }

  updateEstado(estado:Estado){
    let json=JSON.stringify(estado);
    let params=json;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.put(this.url+'estado/'+estado._id,params,options)
                      .map(res=>res.json());
  }

  removeEstado(id:string){

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.delete(this.url+'estado/'+id)
                      .map(res=>res.json());
  }

}
