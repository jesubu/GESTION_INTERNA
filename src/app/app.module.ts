import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import {FormsModule} from '@angular/forms'; //para el databinding
import { AppComponent } from './app.component';
import {routing,appRoutingProviders} from './app.routing';
import { ModulosListComponent } from './modulos/modulos-list/modulos-list.component';
import {HttpModule} from '@angular/http';
import { InicioComponent } from './inicio/inicio.component';
import { AcercadeComponent } from './acercade/acercade.component';
import { IncidenciasListComponent } from './incidencias/incidencias-list/incidencias-list.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap';
import { TRANSLATION_PROVIDERS, TranslatePipe, TranslateService }   from './translate';
import { AddModuloComponent } from './modulos/add-modulo/add-modulo.component';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
//import {columnPipe,rowPipe,searchPipe} from './pipes'
import 'web-animations-js';  
import { NgNotifyPopup } from 'ng2-notify-popup';
import { SedesListComponent } from './sedes/sedes-list/sedes-list.component';
import { AddSedeComponent } from './sedes/add-sede/add-sede.component';
import { TiposListComponent } from './tipos/tipos-list/tipos-list.component';
import { AddTipoComponent } from './tipos/add-tipo/add-tipo.component';
import { AddImportanciaComponent } from './importancias/add-importancia/add-importancia.component';
import { ImportanciasListComponent } from './importancias/importancia-list/importancia-list.component';
import { EstadosListComponent } from './estados/estados-list/estados-list.component';
import { AddEstadoComponent } from './estados/add-estado/add-estado.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import { LoginComponent } from './login/login.component';
import { ConfirmModalComponent } from './utils/confirm-modal/confirm-modal.component';
import { AddIncidenciaComponent } from './incidencias/add-incidencia/add-incidencia.component';
import { AdminGuard } from './services/admin.guard';
import {UserService} from './services/user.service';


@NgModule({
  declarations: [
    AppComponent,
    ModulosListComponent,
    InicioComponent,
    AcercadeComponent,
    IncidenciasListComponent,TranslatePipe, AddModuloComponent, SearchFilterPipe, SedesListComponent, AddSedeComponent, TiposListComponent, 
    AddTipoComponent, AddImportanciaComponent, ImportanciasListComponent, EstadosListComponent, AddEstadoComponent, LoginComponent, ConfirmModalComponent, AddIncidenciaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpModule,AngularFontAwesomeModule,
    Ng2Bs3ModalModule,NgNotifyPopup,CollapseModule.forRoot()
  ],
  providers: [appRoutingProviders,TRANSLATION_PROVIDERS, TranslateService,AdminGuard,UserService],
  bootstrap: [AppComponent]
})

export class AppModule { }

