import { Component, OnInit, ViewChild, Renderer } from '@angular/core';
import { ImportanciaService } from '../../services/importancia.service';
import { Importancia } from '../../models/importancia';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/map';
import { Title } from '@angular/platform-browser';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { AddImportanciaComponent } from '../add-importancia/add-importancia.component';
import { NotificationService } from 'ng2-notify-popup';
import { fadeInAnimation } from '../../_animations/index';



@Component({
  selector: 'app-importancia-list',
  templateUrl: './importancia-list.component.html', animations: [fadeInAnimation],
  styleUrls: ['./importancia-list.component.css'],
  providers: [ImportanciaService, AddImportanciaComponent, NotificationService], host: { '[@fadeInAnimation]': '' }
})
export class ImportanciasListComponent implements OnInit {
  @ViewChild("modalConfirm") modalConfirm: ModalComponent; //new  ! solved
  
  public loading: boolean;

  public oColImportancias: Importancia[];
  public oEdicion: Importancia;
  isCollapsed: boolean = true;

  constructor(private _importanciaService: ImportanciaService,
    private _route: ActivatedRoute,
    private _router: Router, private notify: NotificationService, private renderer: Renderer, private activatedRoute: ActivatedRoute
  ) {
    this.loading = true;
    this._importanciaService.reload = true;
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
   
    this.oEdicion = new Importancia("", "", "");
    this.cargaListado();

  }
  newImportancia(){
    debugger;
    this._importanciaService.oEdicion=null;
  }

  // to append in body
  show(text: string, typ: string): void {
    this.notify.show(text, { position: 'bottom', duration: '2000', type: typ });
  }

  cargaListado() {
    //this._importanciaService.oEdicion=null;
    //console.log(this._importanciaService.reload);
    //recargamos el listado
    if (this._importanciaService.reload == true) {
      this._importanciaService.getImportancias().subscribe(
        result => {

          this.oColImportancias = result.importancias;
          //debugger;
          console.log(result);
          console.log('ok');
          this.loading = false;
          this._importanciaService.reload = false;
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
    this._importanciaService.getImportanciaByID(id).subscribe(
      result => {
        //debugger;
        //this.importancia=result.importancia;
        if (result.status == 200) {
          //this.show("El módulo se ha eliminado correctamente.",'success');
          this._importanciaService.oEdicion = result.importancia;
          this._router.navigate(["add-importancia"], {relativeTo: this._route});
          
          //this.modal.open();
        } else {
          if (!result.importancia) {
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
    //this._router.navigate(['/importancias/add-importancia']);

    
  }
  eliminar(id) {
    this._importanciaService.idSel=id;
    this.modalConfirm.open();
  }

  okEliminar() {
    //this.msgOK = this._translate.instant('El módulo se ha eliminado correctamente.');

    this._importanciaService.removeImportancia(this._importanciaService.idSel).subscribe(
      result => {
        //debugger;
        //this.importancia=result.importancia;
        if (result.status == 200) {
          this.show("La Importancia se ha eliminado correctamente.", 'success');
          this.cargaListado();
        } else {
          if (!result.importancia) {
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
    this._importanciaService.reload = true;

  }

}
