import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TipoService } from '../../services/tipo.service';
import { Tipo } from '../../models/tipo';
import 'rxjs/add/operator/map';
import { slideInOutAnimation } from '../../_animations/index';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'ng2-notify-popup';

@Component({
  selector: 'app-add-tipo',
  templateUrl: './add-tipo.component.html', animations: [slideInOutAnimation],
  host: { '[@slideInOutAnimation]': '' },
  styleUrls: ['./add-tipo.component.css'],
  providers: [NotificationService]
})
export class AddTipoComponent implements OnInit {

 
  public otipo: Tipo;

  constructor(private _tipoService: TipoService, private route: ActivatedRoute,
    private router: Router, private notify: NotificationService
  ) {

  }

  ngOnInit() {
    debugger;

    if ( this._tipoService.oEdicion!=null){
      this.otipo=this._tipoService.oEdicion;
    }
    else{
      this.otipo = new Tipo("", "");
    }
   
    this._tipoService.reload = false;
  }

 // to append in body
  show(text: string, typ: string): void {
    this.notify.show(text, { position: 'bottom', duration: '2000', type: typ });
  }


  onSubmit() {
    debugger;

    if (this.otipo._id == "") {
      //insertamos
      this._tipoService.reload = true;
      this._tipoService.addTipo(this.otipo).subscribe(
        result => {
          this.otipo = result.tipo;
          if (!result.tipo) {
            alert('Error en el Servidor');
          }
          else {
            //limpiamos el objeto para cuando le de de nuevo al boton
            this.otipo = new Tipo("", "");
            this.show("La Tipo se ha guardado correctamente.", 'success');
            this.router.navigate(['/tipos-list']);
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
      this._tipoService.reload = true;
      this._tipoService.updateTipo(this.otipo).subscribe(
        result => {
          this.otipo = result.tipo;
          if (!result.tipo) {
            alert('Error en el Servidor');
          }
          else {
            //limpiamos el objeto para cuando le de de nuevo al boton
            this.otipo = new Tipo("", "");
            this.show("La Tipo se ha guardado correctamente.", 'success');
            this.router.navigate(['/tipos-list']);
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

