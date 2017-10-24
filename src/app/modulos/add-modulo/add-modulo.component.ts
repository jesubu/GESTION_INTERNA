import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModuloService } from '../../services/modulo.service';
import { Modulo } from '../../models/modulo';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-add-modulo',
  templateUrl: './add-modulo.component.html',
  styleUrls: ['./add-modulo.component.css']
})
export class AddModuloComponent implements OnInit {
  //public modulo:Modulo;

  @Output() desde_el_hijo = new EventEmitter();
  @Input('oDatosEdicion') modulo: Modulo;

  constructor(private _moduloService: ModuloService
  ) {
    //this.modulo=new Modulo("","",true);

  }

  ngOnInit() {


  }

  someMethod(event) {
    //console.log('enviamos evento desde_el_hijo');
    console.log('someMethod');
    this.onSubmit();

  }
  onSubmit() {
    console.log('onSubmit');
    if (this.modulo._id == "") {
      //insertamos
      this._moduloService.addModulo(this.modulo).subscribe(
        result => {
          this.modulo = result.modulo;
          if (!result.modulo) {
            alert('Error en el Servidor');
          }
          else {
            //limpiamos el objeto para cuando le de de nuevo al boton
            this.modulo = new Modulo("", "", "", true);
            this.desde_el_hijo.emit({ proceso: true });
          }
        },
        error => {
          var errorMsg = <any>error;
          console.error(errorMsg);
        }
      );
    }
    else {
      //actualizamos
      this._moduloService.updateModulo(this.modulo).subscribe(
        result => {
          this.modulo = result.modulo;
          if (!result.modulo) {
            alert('Error en el Servidor');
          }
          else {
            //limpiamos el objeto para cuando le de de nuevo al boton
            this.modulo = new Modulo("", "", "", true);
            this.desde_el_hijo.emit({ proceso: true });
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
