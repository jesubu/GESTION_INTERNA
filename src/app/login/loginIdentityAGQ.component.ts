import { Component, OnInit, Renderer } from "@angular/core";
import { User } from "../models/user";
import { UserIdentity } from "../models/userIdentity";
import { UserService } from "app/services/user.service";
import { UserIdentityService } from "app/services/userIdentity.service";
import "rxjs/add/operator/map";
import { NotificationService } from "ng2-notify-popup";
import { fadeInAnimation } from "../_animations/index";
import { Router, ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  animations: [fadeInAnimation],
  styleUrls: ["./login.component.css"],
  providers: [UserService, NotificationService, UserIdentityService],
  host: { "[@fadeInAnimation]": "" }
})
export class LoginComponent implements OnInit {
  public user: User;
  public identity;
  public token;
  public status: string;
  public userId: UserIdentity;

  constructor(
    private _userService: UserService,
    private notify: NotificationService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _userIdentityService: UserIdentityService
  ) {
    //this.user = new User("", "", "", "", "", "","");
    this.userId = new UserIdentity("", "", "", "");
    console.log("constr");
  }

  ngOnInit() {}
  // to append in body
  show(text: string, typ: string): void {
    this.notify.show(text, { position: "bottom", duration: "2000", type: typ });
  }

  onSubmit() {
    
    //this.userId = new UserIdentity("", "", "", "", "", "");
    this.userId.grant_type='password';
    this.userId.username='fjdiaz';
    this.userId.password='000000';
    this.userId.scope='openid agqusers';
    debugger;
    this._userIdentityService.signup( this.userId).subscribe(
      result => {

        console.log(result);
      },
      error => {
        var errorMsg = <any>error;
        console.error(errorMsg);
        
      }
    );
  }

  
/*
    console.log(this.user);
    //logeamos el usuario y conseguimos el objeto
    this._userService.signup(this.user).subscribe(
      response => {
        this.identity = response.user;

        if (!this.identity || !this.identity._id) {
          this.show("Usuario no se ha logeado correctamente", "error");
        } else {
          //vaciamos el identity
          this.identity.password = "";
          //persistimos los datos
          localStorage.setItem("identity", JSON.stringify(this.identity));

          //segunda peticion para obtener el token
          //alert(this.user.email);
          this._userService.signup(this.user, "true").subscribe(
            response => {
              //debugger;
              this.token = response.token;
              if (this.token.length <= 0) {
                this.show("el token no se ha generado", "error");
              } else {
                //aqui tenemos el token y lo persistimos.
                localStorage.setItem("token", JSON.stringify(this.token));

                //redirigimos a la pagina principal
                this._router.navigate(["/inicio"]);
                this.user = new User("", "", "", "", "", "");
              }
            },
            error => {
              var body;
              var errorMensaje = <any>error;
              if (errorMensaje != null) {
                body = JSON.parse(error._body);
                this.status = "error";
                this.show("Error:" + body.message, "error");
              }
            }
          );
        }
      },
      error => {
        var body;
        var errorMensaje = <any>error;
        if (errorMensaje != null) {
          body = JSON.parse(error._body);
          this.status = "error";
          this.show("Error:" + body.message, "error");
        }
      }
    );
  }
  */
}
