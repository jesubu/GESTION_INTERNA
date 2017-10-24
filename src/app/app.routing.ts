import {ModuleWithProviders} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';
import { ModulosListComponent } from './modulos/modulos-list/modulos-list.component';
import { InicioComponent } from './inicio/inicio.component';
import { AcercadeComponent } from './acercade/acercade.component';
import { SedesListComponent } from './sedes/sedes-list/sedes-list.component';
import { AddSedeComponent } from "app/sedes/add-sede/add-sede.component";
import { TiposListComponent } from './tipos/tipos-list/tipos-list.component';
import { AddTipoComponent } from './tipos/add-tipo/add-tipo.component';
import { ImportanciasListComponent } from './importancias/importancia-list/importancia-list.component';
import { AddImportanciaComponent } from './importancias/add-importancia/add-importancia.component';
import { EstadosListComponent } from "app/estados/estados-list/estados-list.component";
import { AddEstadoComponent } from "app/estados/add-estado/add-estado.component";
import { IncidenciasListComponent } from "app/incidencias/incidencias-list/incidencias-list.component";
import { AddIncidenciaComponent } from "app/incidencias/add-incidencia/add-incidencia.component";

import { AdminGuard } from './services/admin.guard';




const appRoutes:Routes=[
    {path:'',component  :InicioComponent},
    {path:'inicio',component:InicioComponent},
    {path:'modulos-list',component:ModulosListComponent,data: { title: 'Listado de Proyectos' }},
    //{path:'sedes-list',component:SedesListComponent},
    {
        path: 'solicitudes-list',
        component: IncidenciasListComponent,data: { title: 'Tickets' } ,
        children: [
            { path: 'add-incidencia', component: AddIncidenciaComponent,data: { title: 'Nuevo Ticket' }  }
        ]
        
    },    
    {
        path: 'sedes-list',
        component: SedesListComponent,data: { title: 'Listado de Sedes' } ,
        children: [
            { path: 'add-sede', component: AddSedeComponent,data: { title: 'Nueva Sede' }  }
        ],
        canActivate:[AdminGuard]
    },
    {
        path: 'tipos-list',
        component: TiposListComponent,data: { title: 'Listado de Categorías' } ,
        children: [
            { path: 'add-tipo', component: AddTipoComponent,data: { title: 'Nueva Categoría' }  }
        ]
    },    
    {
        path: 'importancia-list',
        component: ImportanciasListComponent,data: { title: 'Listado de Prioridades' } ,
        children: [
            { path: 'add-importancia', component: AddImportanciaComponent,data: { title: 'Nueva Prioridad' }  }
        ]
    },    
    {
        path: 'estados-list',
        component: EstadosListComponent,data: { title: 'Listado de Estados' } ,
        children: [
            { path: 'add-estado', component: AddEstadoComponent,data: { title: 'Nuevo Estado' }  }
        ]
    },       
    {path:'acercade',component:AcercadeComponent},
    {path:'**',component:InicioComponent}
];

export const appRoutingProviders:any[]=[];

export const routing:ModuleWithProviders=RouterModule.forRoot(appRoutes);
