import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SedeService } from '../../services/sede.service';
import { Sede } from '../../models/sede';
import 'rxjs/add/operator/map';
import { slideInOutAnimation } from '../../_animations/index';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'ng2-notify-popup';

@Component({
  selector: 'app-add-sede',
  templateUrl: './add-sede.component.html', animations: [slideInOutAnimation],
  host: { '[@slideInOutAnimation]': '' },
  styleUrls: ['./add-sede.component.css'],
  providers: [NotificationService]
})
export class AddSedeComponent implements OnInit {

  @Output() desde_el_hijo = new EventEmitter();
  @Input('oDatosEdicion') sede: Sede;

  constructor(private _sedeService: SedeService, private route: ActivatedRoute,
    private router: Router, private notify: NotificationService
  ) {

  }

  ngOnInit() {
    //debugger;
    if ( this._sedeService.oEdicion!=null){
      this.sede=this._sedeService.oEdicion;
    }
    else{
      this.sede = new Sede("", "", null);
    }
    
    this._sedeService.reload = false;
  }

  someMethod(event) {
    //console.log('enviamos evento desde_el_hijo');
    console.log('someMethod');
    this.onSubmit();

  }
  // to append in body
  show(text: string, typ: string): void {
    this.notify.show(text, { position: 'bottom', duration: '2000', type: typ });
  }


  onSubmit() {


    if (this.sede._id == "") {
      //insertamos
      this._sedeService.reload = true;
      this._sedeService.addSede(this.sede).subscribe(
        result => {
          this.sede = result.sede;
          if (!result.sede) {
            alert('Error en el Servidor');
          }
          else {
            //limpiamos el objeto para cuando le de de nuevo al boton
            this.sede = new Sede("", "", null);
            this.show("La Sede se ha guardado correctamente.", 'success');
            this.router.navigate(['/sedes-list']);
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
      this._sedeService.reload = true;
      this._sedeService.updateSede(this.sede).subscribe(
        result => {
          this.sede = result.sede;
          if (!result.sede) {
            alert('Error en el Servidor');
          }
          else {
            //limpiamos el objeto para cuando le de de nuevo al boton
            this.sede = new Sede("", "", null);
            this.show("La Sede se ha guardado correctamente.", 'success');
            this.router.navigate(['/sedes-list']);
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

