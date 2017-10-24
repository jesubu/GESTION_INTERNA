import { Injectable } from '@angular/core';
import {Http,Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import {Subject} from 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {Modulo} from '../models/modulo';


@Injectable()
export class ModuloService {

  public url:string;
  public idSel: string;

  constructor(private _http:Http) {
    this.url='http://localhost:3678/api/';
   }
  getModuloByID(id){
    return this._http.get(this.url+'modulo/'+id)
                      .map(res=>res.json());
  }

  getModulos(){
    return this._http.get(this.url+'modulos')
                      .map(res=>res.json());
  }

  addModulo(modulo:Modulo){
    let json=JSON.stringify(modulo);
    let params=json;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.url+'modulo',params,options)
                      .map(res=>res.json());
  }

  updateModulo(modulo:Modulo){
    let json=JSON.stringify(modulo);
    let params=json;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.put(this.url+'modulo/'+modulo._id,params,options)
                      .map(res=>res.json());
  }

  removeModulo(id:string){

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.delete(this.url+'modulo/'+id)
                      .map(res=>res.json());
  }

}
