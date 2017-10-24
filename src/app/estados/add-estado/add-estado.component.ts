import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EstadoService } from '../../services/estado.service';
import { Estado } from '../../models/estado';
import 'rxjs/add/operator/map';
import { slideInOutAnimation } from '../../_animations/index';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'ng2-notify-popup';

@Component({
  selector: 'app-add-estado',
  templateUrl: './add-estado.component.html', animations: [slideInOutAnimation],
  host: { '[@slideInOutAnimation]': '' },
  styleUrls: ['./add-estado.component.css'],
  providers: [NotificationService]
})
export class AddEstadoComponent implements OnInit {

  public estado: Estado;

  constructor(private _estadoService: EstadoService, private route: ActivatedRoute,
    private router: Router, private notify: NotificationService
  ) {

  }

  ngOnInit() {
    //debugger;
    if ( this._estadoService.oEdicion!=null){
      this.estado=this._estadoService.oEdicion;
    }
    else{
      this.estado = new Estado("", "","");
    }
    
    this._estadoService.reload = false;
  }

  // to append in body
  show(text: string, typ: string): void {
    this.notify.show(text, { position: 'bottom', duration: '2000', type: typ });
  }


  onSubmit() {


    if (this.estado._id == "") {
      //insertamos
      this._estadoService.reload = true;
      this._estadoService.addEstado(this.estado).subscribe(
        result => {
          this.estado = result.estado;
          if (!result.estado) {
            alert('Error en el Servidor');
          }
          else {
            //limpiamos el objeto para cuando le de de nuevo al boton
            this.estado = new Estado("", "","");
            this.show("La Estado se ha guardado correctamente.", 'success');
            this.router.navigate(['/estados-list']);
          }
        },
        error => {
          var errorMsg = <any>error;
          console.error(errorMsg);
        }
      );
    }
    else{
      //actualizamos
      this._estadoService.reload = true;
      this._estadoService.updateEstado(this.estado).subscribe(
        result => {
          this.estado = result.estado;
          if (!result.estado) {
            alert('Error en el Servidor');
          }
          else {
            //limpiamos el objeto para cuando le de de nuevo al boton
            this.estado = new Estado("", "","");
            this.show("La Estado se ha guardado correctamente.", 'success');
            this.router.navigate(['/estados-list']);
          }
        },
        error => {
          var errorMsg = <any>error;
          console.error(errorMsg);
        }
      );      
    }


  }

}

