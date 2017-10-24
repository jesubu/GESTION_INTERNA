import { Injectable } from '@angular/core';
import {Http,Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import {Subject} from 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {Sede} from '../models/sede';

@Injectable()
export class SedeService {

 public url:string;
 public reload:boolean;
 public oEdicion: Sede;
 public idSel:string;
 
  constructor(private _http:Http) {
    this.url='http://localhost:3678/api/';
    this.reload=false;
   }
  getSedeByID(id){
    return this._http.get(this.url+'sede/'+id)
                      .map(res=>res.json());
  }

  getSedes(){
    debugger;
    return this._http.get(this.url+'sedes')
                      .map(res=>res.json());
  }

  addSede(sede:Sede){
    
    let json=JSON.stringify(sede);
    let params=json;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.url+'sede',params,options)
                      .map(res=>res.json());
  }

  updateSede(sede:Sede){
    let json=JSON.stringify(sede);
    let params=json;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.put(this.url+'sede/'+sede._id,params,options)
                      .map(res=>res.json());
  }

  removeSede(id:string){

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.delete(this.url+'sede/'+id)
                      .map(res=>res.json());
  }

}
