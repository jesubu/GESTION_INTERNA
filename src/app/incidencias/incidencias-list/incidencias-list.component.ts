import { Component, OnInit, ViewChild, Renderer } from "@angular/core";
import { TicketService } from "../../services/ticket.service";
import { Ticket } from "../../models/ticket";
import { Router, ActivatedRoute, Params, NavigationEnd } from "@angular/router";
import "rxjs/add/operator/map";
import { ModalComponent } from "ng2-bs3-modal/ng2-bs3-modal";

import { NotificationService } from "ng2-notify-popup";
import "rxjs/add/operator/map";
import { Title } from "@angular/platform-browser";
import { fadeInAnimation } from "../../_animations/index";

import { EstadoService } from "../../services/estado.service";
import { Estado } from "../../models/estado";
import * as _ from "lodash";
import { AddIncidenciaComponent } from "app/incidencias/add-incidencia/add-incidencia.component";

@Component({
  selector: "app-incidencias-list",
  templateUrl: "./incidencias-list.component.html",
  styleUrls: ["./incidencias-list.component.css"],
  animations: [fadeInAnimation],
  providers: [
    TicketService,
    NotificationService,
    EstadoService,
    AddIncidenciaComponent
  ],
  host: { "[@fadeInAnimation]": "" }
})
export class IncidenciasListComponent implements OnInit {
  @ViewChild("modalConfirm") modalConfirm: ModalComponent; //new  ! solved

  public loading: boolean;
  public oColTickets: Ticket[];
  public oColTicketsTodos: Ticket[];
  public oColEstados: Estado[];
  public oEdicion: Ticket;
  isCollapsed: boolean = true;

  constructor(
    private _ticketService: TicketService,
    private _estadoService: EstadoService,
    private _route: ActivatedRoute,
    private _router: Router,
    private notify: NotificationService,
    private renderer: Renderer,
    private activatedRoute: ActivatedRoute
  ) {
    this.loading = true;
    this._ticketService.reload = true;
  }

  setHeight(el, height) {
    this.renderer.setElementStyle(el, "height", height + "px");
  }

  ngOnInit() {
    console.log("init");
    this.cargaEstados();
    this._router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map(_route => {
        //debugger;
        while (_route.firstChild) {
          _route = _route.firstChild;
        }
        return _route;
      })
      .filter(_route => _route.outlet === "primary")
      .mergeMap(_route => _route.data)
      .subscribe(event => this.cargaListado());

    this.oEdicion = new Ticket(
      "",
      "",
      "",
      new Date(),
      null,
      null,
      null,
      null,
      null
    );
    this.cargaListado();
  }
  newTicket() {
    //debugger;
    this._ticketService.oEdicion = null;
  }

  filtraEstado(id) {
    if (this.oColTicketsTodos == null) {
      this.oColTicketsTodos = this.oColTickets;
    }
    if (id == 0) {
      this.oColTickets = this.oColTicketsTodos;
    } else {
      //this.oColTickets=this.oColTicketsTodos;
      this.oColTickets = this.oColTicketsTodos.filter(
        items => items.estado._id.indexOf(id) !== -1
      );
    }

    //console.log(this.oColTickets);
  }
  // to append in body
  show(text: string, typ: string): void {
    this.notify.show(text, { position: "bottom", duration: "2000", type: typ });
  }

  cargaEstados() {
    this._estadoService.getEstados().subscribe(
      result => {
        this.oColEstados = result.estados;
      },
      error => {
        var errorMsg = <any>error;
        console.error(errorMsg);
      }
    );
  }

  cargaListado() {
    //this._estadoService.oEdicion=null;
    //console.log(this._estadoService.reload);
    //recargamos el listado
    console.log("listado ini ");
    if (this._ticketService.reload == true) {
      this._ticketService.getTickets().subscribe(
        result => {
          //debugger;
          this.oColTickets = result.solicitudes;
          //
          console.log(this.oColTickets);
          //console.log('ok');
          //this.oEdicion=this.oColTickets[0];
          this.loading = false;
          this._ticketService.reload = false;
          console.log("listado fin");
        },
        error => {
          var errorMsg = <any>error;
          console.error(errorMsg);
          this.loading = false;
        }
      );
    }
  }

  editar(id) {
    console.log(id);
    this._ticketService.getTicketByID(id).subscribe(
      result => {
        if (result.status == 200) {
          this._ticketService.oEdicion = result.solicitud;
          //console.log(this._ticketService.oEdicion);
          this._router.navigate(["add-incidencia"], {
            relativeTo: this._route
          });
        } else {
          if (!result.sede) {
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
