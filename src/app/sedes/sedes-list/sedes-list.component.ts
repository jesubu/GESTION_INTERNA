import { Component, OnInit, ViewChild, Renderer } from '@angular/core';
import { SedeService } from '../../services/sede.service';
import { Sede } from '../../models/sede';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/map';
import { Title } from '@angular/platform-browser';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { AddSedeComponent } from '../add-sede/add-sede.component';
import { NotificationService } from 'ng2-notify-popup';
import { fadeInAnimation } from '../../_animations/index';


@Component({
  selector: 'app-sedes-list',
  templateUrl: './sedes-list.component.html', animations: [fadeInAnimation],
  styleUrls: ['./sedes-list.component.css'],
  providers: [SedeService, AddSedeComponent, NotificationService], host: { '[@fadeInAnimation]': '' }
})
export class SedesListComponent implements OnInit {
  @ViewChild("modalConfirm") modalConfirm: ModalComponent; //new  ! solved

  public loading: boolean;

  public oColSedes: Sede[];
  public oEdicion: Sede;
  isCollapsed: boolean = true;

  constructor(private _sedeService: SedeService,
    private _route: ActivatedRoute,
    private _router: Router, private notify: NotificationService, private renderer: Renderer, private activatedRoute: ActivatedRoute
  ) {
    this.loading = true;
    this._sedeService.reload = true;
  }

  setHeight(el, height) {
    this.renderer.setElementStyle(el, 'height', height + 'px');
  }

  ngOnInit() {
    
    this._router.events
      .filter((event) => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map((_route) => {
        //debugger;
        while (_route.firstChild) {
          _route = _route.firstChild;
        }
        return _route;
      })
      .filter((_route) => _route.outlet === 'primary')
      .mergeMap((_route) => _route.data)
      .subscribe((event) => this.cargaListado());
   
    this.oEdicion = new Sede("", "", null);
    this.cargaListado();

  }
  newSede(){
    debugger;
    this._sedeService.oEdicion=null;
  }

  // to append in body
  show(text: string, typ: string): void {
    this.notify.show(text, { position: 'bottom', duration: '2000', type: typ });
  }

  cargaListado() {
    //this._sedeService.oEdicion=null;
    //console.log(this._sedeService.reload);
    //recargamos el listado
    if (this._sedeService.reload == true) {
      this._sedeService.getSedes().subscribe(
        result => {

          this.oColSedes = result.sedes;
          //debugger;
          console.log(result);
          console.log('ok');
          this.loading = false;
          this._sedeService.reload = false;
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


    //alert(id);
    this._sedeService.getSedeByID(id).subscribe(
      result => {
        //debugger;
        //this.sede=result.sede;
        if (result.status == 200) {
          //this.show("El módulo se ha eliminado correctamente.",'success');
          this._sedeService.oEdicion = result.sede;
          this._router.navigate(["add-sede"], {relativeTo: this._route});
          
          //this.modal.open();
        } else {
          if (!result.sede) {
            this.show("Error:" + result.message, 'error');
          }
          else {
            this.show("Error:" + result.message, 'error');
          }
        }
      },
      error => {
        var errorMsg = <any>error;
        this.show("Error:" + errorMsg, 'error');
        console.error(errorMsg);
      }
    );
    debugger;
    //this._router.navigate(['/sedes/add-sede']);

    
  }
  eliminar(id) {
    this._sedeService.idSel=id;
    this.modalConfirm.open();
  }

  okEliminar() {
    //this.msgOK = this._translate.instant('El módulo se ha eliminado correctamente.');

    this._sedeService.removeSede(this._sedeService.idSel).subscribe(
      result => {
        //debugger;
        //this.sede=result.sede;
        if (result.status == 200) {
          this.show("La Sede se ha eliminado correctamente.", 'success');
          this.cargaListado();
        } else {
          if (!result.sede) {
            this.show("Error:" + result.message, 'error');
          }
          else {
            this.show("Error:" + result.message, 'error');
          }
        }
      },
      error => {
        var errorMsg = <any>error;
        this.show("Error:" + errorMsg, 'error');
        console.error(errorMsg);
      }
    );
    this._sedeService.reload = true;

  }

}
