import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ImportanciaService } from '../../services/importancia.service';
import { Importancia } from '../../models/importancia';
import 'rxjs/add/operator/map';
import { slideInOutAnimation } from '../../_animations/index';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'ng2-notify-popup';


@Component({
  selector: 'app-add-importancia',
  templateUrl: './add-importancia.component.html', animations: [slideInOutAnimation],
  host: { '[@slideInOutAnimation]': '' },
  styleUrls: ['./add-importancia.component.css'],
  providers: [NotificationService]
})
export class AddImportanciaComponent implements OnInit {

  @Output() desde_el_hijo = new EventEmitter();
  @Input('oDatosEdicion') importancia: Importancia;

  constructor(private _importanciaService: ImportanciaService, private route: ActivatedRoute,
    private router: Router, private notify: NotificationService
  ) {

  }

  ngOnInit() {
    //debugger;
    if ( this._importanciaService.oEdicion!=null){
      this.importancia=this._importanciaService.oEdicion;
    }
    else{
      this.importancia = new Importancia("", "", "");
    }
    
    this._importanciaService.reload = false;
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


    if (this.importancia._id == "") {
      //insertamos
      this._importanciaService.reload = true;
      this._importanciaService.addImportancia(this.importancia).subscribe(
        result => {
          this.importancia = result.importancia;
          if (!result.importancia) {
            alert('Error en el Servidor');
          }
          else {
            //limpiamos el objeto para cuando le de de nuevo al boton
            this.importancia = new Importancia("", "", null);
            this.show("La Importancia se ha guardado correctamente.", 'success');
            this.router.navigate(['/importancia-list']);
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
      this._importanciaService.reload = true;
      this._importanciaService.updateImportancia(this.importancia).subscribe(
        result => {
          this.importancia = result.importancia;
          if (!result.importancia) {
            alert('Error en el Servidor');
          }
          else {
            //limpiamos el objeto para cuando le de de nuevo al boton
            this.importancia = new Importancia("", "", null);
            this.show("La Importancia se ha guardado correctamente.", 'success');
            this.router.navigate(['/importancia-list']);
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

