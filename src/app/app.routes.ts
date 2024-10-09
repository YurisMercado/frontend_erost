import { Routes } from '@angular/router';
import { UsuariosComponent } from './modulos/dashboard/dashboard/components/usuarios/usuarios.component';
import { ModelosComponent } from './modulos/dashboard/dashboard/components/modelos/modelos.component';
import { DetalleModeloComponent } from './modulos/dashboard/dashboard/components/detalle-modelo/detalle-modelo.component';
import { PerfilComponent } from './modulos/dashboard/dashboard/components/perfil/perfil.component';
import { AuthGuard } from './modulos/shared/seguridad.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadChildren: () => import('./modulos/login/login.module').then(m => m.LoginModule)
    },
    {
        path: 'dashboard',
        canActivate:[AuthGuard],
        loadComponent: () => import('./modulos/dashboard/dashboard/dashboard.component').then(m => m.DashboardComponent),
        children:[
            {
                path: '',
                canActivate:[AuthGuard],
                component: PerfilComponent   
                
            },
            {
                path: 'usuarios',
                canActivate:[AuthGuard],
                component: UsuariosComponent
            },
            {
                path: 'modelos',
                canActivate:[AuthGuard],
                component: ModelosComponent
            },
            {
                path: 'detalle-modelo',
                canActivate:[AuthGuard],
                component: DetalleModeloComponent
            }
        ]
    }
];
