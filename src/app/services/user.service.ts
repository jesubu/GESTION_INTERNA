import { Injectable } from '@angular/core';
import {Http,Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import {Subject} from 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/user';

@Injectable()
export class UserService {

  public url:string;
  public reload:boolean;
  public identity;
  public token;

  
   constructor(private _http:Http) {
     this.url='http://localhost:3678/api/';
     this.reload=false;
    }

    signup(user_to_login,gettoken=null){
      //debugger;
      if(gettoken!=null){
        user_to_login.gettoken=gettoken;
      }

      let params=JSON.stringify(user_to_login);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      return this._http.post(this.url+'login',params,options)
      .map(res=>res.json());

    }

    getIdentity(){
      let identity=JSON.parse(localStorage.getItem('identity'));
      if (identity!="undefined"){
        this.identity=identity;

      }else{
        this.identity=null;
      }
      return this.identity;

    }

    getToken(){
      let token=localStorage.getItem('token');
      if (token!="undefined"){
        this.token=token;
      }
      else{
        this.token=null;
      }
      return this.token;
      
    }


}
