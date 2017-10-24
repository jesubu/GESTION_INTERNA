import { Component, OnInit, ViewChild } from "@angular/core";
import { ModuloService } from "../../services/modulo.service";
import { Modulo } from "../../models/modulo";
import { Router, ActivatedRoute, Params } from "@angular/router";
import "rxjs/add/operator/map";

import { ModalComponent } from "ng2-bs3-modal/ng2-bs3-modal";
import { AddModuloComponent } from "../add-modulo/add-modulo.component";
import { NotificationService } from "ng2-notify-popup";

@Component({
  selector: "app-modulos-list",
  templateUrl: "./modulos-list.component.html",
  styleUrls: ["./modulos-list.component.css"],
  providers: [ModuloService, AddModuloComponent, NotificationService]
})
export class ModulosListComponent implements OnInit {

  @ViewChild("modal") modal: ModalComponent; //new  ! solved

  @ViewChild("modalConfirm") modalConfirm: ModalComponent; //new  ! solved
 

  public loading: boolean;
 
  public oColModulos: Modulo[];
  public oEdicion: Modulo;

  constructor(
    private _moduloService: ModuloService,
    private _route: ActivatedRoute,
    private _router: Router,
    private notify: NotificationService
  ) {
    this.loading = true;
  }

  ngOnInit() {
    this.oEdicion = new Modulo("", "", "", true);
    this.cargaListado();
  }
  open() {
    this.oEdicion = new Modulo("", "", "", true);
    this.modal.open();
  }

  recibirDatos(event) {
    console.log("recibimos evento desde_el_hijo");
    this.show("El módulo se ha guardado correctamente.", "success");
    this.modal.dismiss();
    this.cargaListado();
  }

  // to append in body
  show(text: string, typ: string): void {
    this.notify.show(text, { position: "bottom", duration: "2000", type: typ });
  }

  cargaListado() {
    //recargamos el listado
    this._moduloService.getModulos().subscribe(
      result => {
        this.oColModulos = result.modulos;
        console.log(result);
        console.log("ok");
        this.loading = false;
      },
      error => {
        var errorMsg = <any>error;
        console.error(errorMsg);
        this.loading = false;
      }
    );
  }
  editar(id) {
    //alert(id);
    this._moduloService.getModuloByID(id).subscribe(
      result => {
        //debugger;
        //this.modulo=result.modulo;
        if (result.status == 200) {
          //this.show("El módulo se ha eliminado correctamente.",'success');
          this.oEdicion = result.modulo;
          this.modal.open();
        } else {
          if (!result.modulo) {
            this.show("Error:" + result.message, "error");
          } else {
            this.show("Error:" + result.message, "error");
          }
        }
      },
      error => {
        var errorMsg = <any>error;
        this.show("Error:" + errorMsg, "error");
        console.error(errorMsg);
      }
    );
  }

  eliminar(id) {
    this._moduloService.idSel=id;
    this.modalConfirm.open();
  }
  
  okEliminar() {
      //alert('asdf');
      this._moduloService.removeModulo(this._moduloService.idSel).subscribe(
        result => {
          //debugger;
          //this.modulo=result.modulo;
          if (result.status == 200) {
            this.show("El módulo se ha eliminado correctamente.", "success");
            this.cargaListado();
          } else {
            if (!result.modulo) {
              this.show("Error:" + result.message, "error");
            } else {
              this.show("Error:" + result.message, "error");
            }
          }
        },
        error => {
          var errorMsg = <any>error;
          this.show("Error:" + errorMsg, "error");
          console.error(errorMsg);
        }
      );
    
  }


}
