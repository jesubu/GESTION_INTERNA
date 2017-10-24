import { Injectable } from '@angular/core';
import {Http,Headers, RequestOptions,URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import {Subject} from 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {UserIdentity} from '../models/userIdentity';

@Injectable()
export class UserIdentityService {

  public url:string;
  public reload:boolean;
  public identity;
  public token;

  
   constructor(private _http:Http) {
     this.url='http://agqidentity.agqlabs.es/identity/connect/token';
     this.reload=false;
    }

    signup(userIdentity_to_login){
        //debugger;
        var str = "";
        for (var p in userIdentity_to_login)
        {
            str+=(encodeURIComponent(p) + "=" + encodeURIComponent(userIdentity_to_login[p]))+"&";
            
        }
        str=str.substring(0,str.length-1);
        let params=(userIdentity_to_login);
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded','Authorization': 'Basic YW5ndWxhcmNsaWVudDpGNjIxRjQ3MC05NzMxLTRBMjUtODBFRi02N0E2RjdDNUY0Qjg=' });
        let options = new RequestOptions({ headers: headers });

        return this._http.post(this.url,str,options)
        .map(res=>res.json());
}


}
