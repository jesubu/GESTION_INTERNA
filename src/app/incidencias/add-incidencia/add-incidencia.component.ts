import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModuloService } from "../../services/modulo.service";
import { Modulo } from "../../models/modulo";
import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../../models/ticket';
import { SedeService } from '../../services/sede.service';
import { Sede } from '../../models/sede';
import { EstadoService } from '../../services/estado.service';
import { Estado } from '../../models/estado';
import { ImportanciaService } from '../../services/importancia.service';
import { Importancia } from '../../models/importancia';
import { TipoService } from '../../services/tipo.service';
import { Tipo } from '../../models/tipo';

import 'rxjs/add/operator/map';
import { slideInOutAnimation } from '../../_animations/index';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'ng2-notify-popup';

@Component({
  selector: 'app-add-incidencia',
  templateUrl: './add-incidencia.component.html', animations: [slideInOutAnimation],
  host: { '[@slideInOutAnimation]': '' },
  styleUrls: ['./add-incidencia.component.css'], 
  providers: [NotificationService,ModuloService,SedeService,EstadoService,ImportanciaService,TipoService]
})
export class AddIncidenciaComponent implements OnInit {
  public sItem:string;
  public oTicket: Ticket;
  public oColModulos: Modulo[];
  public oColSedes: Sede[];
  public oColEstados: Estado[];
  public oColImportancias: Importancia[];
  public oColTipos: Tipo[];

  constructor(private _ticketService: TicketService,private route: ActivatedRoute,
    private router: Router, private notify: NotificationService,
    private _moduloService: ModuloService,private _sedeService: SedeService,private _estadoService: EstadoService,
    private _importanciaService: ImportanciaService,private _tipoService: TipoService
  ) {

  }


  ngOnInit() {
    //debugger;
    this.cargaCombos();
    if ( this._ticketService.oEdicion!=null){
      //debugger;
      this.oTicket=this._ticketService.oEdicion;
    }
    else{
      this.oTicket = new Ticket("","","",null,null,null,null,null,null);
    }
    
    this._ticketService.reload = false;
  }

  // to append in body
  show(text: string, typ: string): void {
    this.notify.show(text, { position: 'bottom', duration: '2000', type: typ });
  }

cargaCombos(){
console.log('modulos ini');

  this._moduloService.getModulos().subscribe(
    result => {
      this.oColModulos = result.modulos;
      console.log('modulos on');
    },
    error => {
      var errorMsg = <any>error;
      console.error(errorMsg);
    }
  );
  console.log('modulos fin');

  console.log('sedes ini');
  this._sedeService.getSedes().subscribe(
    result => {

      this.oColSedes = result.sedes;
      console.log('sedes on');
    },
    error => {
      var errorMsg = <any>error;
      console.error(errorMsg);

    }
  );
  console.log('sedes fin');
  this._estadoService.getEstados().subscribe(
    result => {
      this.oColEstados = result.estados;
    },
    error => {
      var errorMsg = <any>error;
      console.error(errorMsg);
    }
  );

  this._importanciaService.getImportancias().subscribe(
    result => {
      this.oColImportancias = result.importancias;
    },
    error => {
      var errorMsg = <any>error;
      console.error(errorMsg);
    }
  );

  this._tipoService.getTipos().subscribe(
    result => {
      this.oColTipos = result.tipos;
    },
    error => {
      var errorMsg = <any>error;
      console.error(errorMsg);
    }
  );

}

}