import { Injectable } from '@angular/core';
import {Http,Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import {Subject} from 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {Importancia} from '../models/Importancia';

@Injectable()
export class ImportanciaService {

 public url:string;
 public reload:boolean;
 public oEdicion: Importancia;
 public idSel:string;
 
  constructor(private _http:Http) {
    this.url='http://localhost:3678/api/';
    this.reload=false;
   }
  getImportanciaByID(id){
    return this._http.get(this.url+'Importancia/'+id)
                      .map(res=>res.json());
  }

  getImportancias(){
    debugger;
    return this._http.get(this.url+'Importancias')
                      .map(res=>res.json());
  }

  addImportancia(Importancia:Importancia){
    
    let json=JSON.stringify(Importancia);
    let params=json;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.url+'Importancia',params,options)
                      .map(res=>res.json());
  }

  updateImportancia(Importancia:Importancia){
    let json=JSON.stringify(Importancia);
    let params=json;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.put(this.url+'Importancia/'+Importancia._id,params,options)
                      .map(res=>res.json());
  }

  removeImportancia(id:string){

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.delete(this.url+'Importancia/'+id)
                      .map(res=>res.json());
  }

}
