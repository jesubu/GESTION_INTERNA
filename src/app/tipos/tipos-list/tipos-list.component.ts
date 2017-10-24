import { Component, OnInit, ViewChild, Renderer } from '@angular/core';
import { TipoService } from '../../services/tipo.service';
import { Tipo } from '../../models/tipo';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/map';
import { Title } from '@angular/platform-browser';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { AddTipoComponent } from '../add-tipo/add-tipo.component';
import { NotificationService } from 'ng2-notify-popup';
import { fadeInAnimation } from '../../_animations/index';


@Component({
  selector: 'app-tipos-list',
  templateUrl: './tipos-list.component.html', animations: [fadeInAnimation],
  styleUrls: ['./tipos-list.component.css'],
  providers: [TipoService, AddTipoComponent, NotificationService], host: { '[@fadeInAnimation]': '' }
})
export class TiposListComponent implements OnInit {
  @ViewChild("modalConfirm") modalConfirm: ModalComponent; //new  ! solved

  public loading: boolean;

  public oColTipos: Tipo[];
  public oEdicion: Tipo;
  isCollapsed: boolean = true;

  constructor(private _tipoService: TipoService,
    private _route: ActivatedRoute,
    private _router: Router, private notify: NotificationService, private renderer: Renderer, private activatedRoute: ActivatedRoute
  ) {
    this.loading = true;
    this._tipoService.reload = true;
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
   
    this.oEdicion = new Tipo("", "");
    this.cargaListado();

  }
  newTipo(){
    debugger;
    this._tipoService.oEdicion=null;
  }

  // to append in body
  show(text: string, typ: string): void {
    this.notify.show(text, { position: 'bottom', duration: '2000', type: typ });
  }

  cargaListado() {
    //this._tipoService.oEdicion=null;
    //console.log(this._tipoService.reload);
    //recargamos el listado
    if (this._tipoService.reload == true) {
      this._tipoService.getTipos().subscribe(
        result => {

          this.oColTipos = result.tipos;
          debugger;
          console.log(result);
          console.log('ok');
          this.loading = false;
          this._tipoService.reload = false;
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
    this._tipoService.getTipoByID(id).subscribe(
      result => {
        //debugger;
        //this.tipo=result.tipo;
        if (result.status == 200) {
          //this.show("El módulo se ha eliminado correctamente.",'success');
          this._tipoService.oEdicion = result.tipo;
          this._router.navigate(["add-tipo"], {relativeTo: this._route});
          
          //this.modal.open();
        } else {
          if (!result.tipo) {
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
    //this._router.navigate(['/tipos/add-tipo']);

    
  }

  eliminar(id) {
    this._tipoService.idSel=id;
    this.modalConfirm.open();
  }

  okEliminar(id) {
    //this.msgOK = this._translate.instant('El módulo se ha eliminado correctamente.');

    this._tipoService.removeTipo(this._tipoService.idSel).subscribe(
      result => {
        //debugger;
        //this.tipo=result.tipo;
        if (result.status == 200) {
          this.show("La Tipo se ha eliminado correctamente.", 'success');
          this.cargaListado();
        } else {
          if (!result.tipo) {
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
    this._tipoService.reload = true;

  }

}
