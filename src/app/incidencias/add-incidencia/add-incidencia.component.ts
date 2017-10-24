import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../../models/ticket';

import 'rxjs/add/operator/map';
import { slideInOutAnimation } from '../../_animations/index';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'ng2-notify-popup';

@Component({
  selector: 'app-add-incidencia',
  templateUrl: './add-incidencia.component.html', animations: [slideInOutAnimation],
  host: { '[@slideInOutAnimation]': '' },
  styleUrls: ['./add-incidencia.component.css'], 
  providers: [NotificationService]
})
export class AddIncidenciaComponent implements OnInit {

  public oTicket: Ticket;

  constructor(private _ticketService: TicketService,private route: ActivatedRoute,
    private router: Router, private notify: NotificationService
  ) {

  }


  ngOnInit() {
    //debugger;
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



}