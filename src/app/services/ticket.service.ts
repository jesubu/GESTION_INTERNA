import { Injectable } from '@angular/core';
import {Http,Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import {Subject} from 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {Ticket} from '../models/ticket';

@Injectable()
export class TicketService {
  public url:string;
  public reload:boolean;
  public oEdicion: Ticket;
  public idSel:string;

  constructor(private _http:Http) {
    this.url='http://localhost:3678/api/';
    this.reload=false;
   }
  
  /*
   getTicketByID(id){
    return this._http.get(this.url+'tipo/'+id)
                      .map(res=>res.json());
  }
*/
  getTickets(){
    //debugger;
    return this._http.get(this.url+'solicitudes')
                      .map(res=>res.json());
  }

  getTicketByID(id){
    return this._http.get(this.url+'solicitudes/'+id)
                      .map(res=>res.json());
  }



  addTicket(ticket:Ticket){
    debugger;
    let json=JSON.stringify(ticket);
    let params=json;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.post(this.url+'solicitud',params,options)
                      .map(res=>res.json());
  }


  updateTicket(ticket:Ticket){
    let json=JSON.stringify(ticket);
    let params=json;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.put(this.url+'solicitud/'+ticket._id,params,options)
                      .map(res=>res.json());
  }

  removeTicket(id:string){

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.delete(this.url+'solicitud/'+id)
                      .map(res=>res.json());
  }

  

}
