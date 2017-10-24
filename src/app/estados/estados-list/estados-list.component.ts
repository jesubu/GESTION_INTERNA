import { Component, OnInit, ViewChild, Renderer } from '@angular/core';
import { EstadoService } from '../../services/estado.service';
import { Estado } from '../../models/estado';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/map';
import { Title } from '@angular/platform-browser';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { AddEstadoComponent } from '../add-estado/add-estado.component';
import { NotificationService } from 'ng2-notify-popup';
import { fadeInAnimation } from '../../_animations/index';


@Component({
  selector: 'app-estados-list',
  templateUrl: './estados-list.component.html', animations: [fadeInAnimation],
  styleUrls: ['./estados-list.component.css'],
  providers: [EstadoService, AddEstadoComponent, NotificationService], host: { '[@fadeInAnimation]': '' }
})
export class EstadosListComponent implements OnInit {

  @ViewChild("modalConfirm") modalConfirm: ModalComponent; //new  ! solved
  
  public loading: boolean;

  public oColEstados: Estado[];
  public oEdicion: Estado;
  isCollapsed: boolean = true;

  constructor(private _estadoService: EstadoService,
    private _route: ActivatedRoute,
    private _router: Router, private notify: NotificationService, private renderer: Renderer, private activatedRoute: ActivatedRoute
  ) {
    this.loading = true;
    this._estadoService.reload = true;
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
   
    this.oEdicion = new Estado("", "","");
    this.cargaListado();

  }
  newEstado(){
    debugger;
    this._estadoService.oEdicion=null;
  }

  // to append in body
  show(text: string, typ: string): void {
    this.notify.show(text, { position: 'bottom', duration: '2000', type: typ });
  }

  cargaListado() {
    //this._estadoService.oEdicion=null;
    //console.log(this._estadoService.reload);
    //recargamos el listado
    if (this._estadoService.reload == true) {
      this._estadoService.getEstados().subscribe(
        result => {

          this.oColEstados = result.estados;
          //debugger;
          console.log(result);
          console.log('ok');
          this.loading = false;
          this._estadoService.reload = false;
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
    this._estadoService.getEstadoByID(id).subscribe(
      result => {
        //debugger;
        //this.estado=result.estado;
        if (result.status == 200) {
          //this.show("El módulo se ha eliminado correctamente.",'success');
          this._estadoService.oEdicion = result.estado;
          this._router.navigate(["add-estado"], {relativeTo: this._route});
          
          //this.modal.open();
        } else {
          if (!result.estado) {
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
    //this._router.navigate(['/estados/add-estado']);

    
  }

  eliminar(id) {
    this._estadoService.idSel=id;
    this.modalConfirm.open();
  }

  okEliminar() {
    //this.msgOK = this._translate.instant('El módulo se ha eliminado correctamente.');

    this._estadoService.removeEstado(this._estadoService.idSel).subscribe(
      result => {
        //debugger;
        //this.estado=result.estado;
        if (result.status == 200) {
          this.show("La Estado se ha eliminado correctamente.", 'success');
          this.cargaListado();
        } else {
          if (!result.estado) {
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
    this._estadoService.reload = true;

  }

}
