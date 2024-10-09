import { Component, inject } from '@angular/core';
import { LayoutService } from '../service/app.layout.service';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../componentes/sidebar/sidebar.component';
import { TopbarComponent } from '../componentes/topbar/topbar.component';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    TopbarComponent, 
    SidebarComponent, 
    RouterModule,
    ToastModule
  
  ],
  providers: [MessageService],

  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  layoutService: LayoutService = inject(LayoutService);

  constructor(){
    
  }

   obtenerDatosUsuario(){
     let idUsuario = localStorage.getItem('usuaario');
   }

  get containerClass() {
    return {
      'layout-theme-light': this.layoutService.config().colorScheme === 'light',
      'layout-theme-dark': this.layoutService.config().colorScheme === 'dark',
      'layout-overlay': this.layoutService.config().menuMode === 'overlay',
      'layout-static': this.layoutService.config().menuMode === 'static',
      'layout-static-inactive':
        this.layoutService.state.staticMenuDesktopInactive &&
        this.layoutService.config().menuMode === 'static',
      'layout-overlay-active': this.layoutService.state.overlayMenuActive,
      'layout-mobile-active': this.layoutService.state.staticMenuMobileActive,
      'p-input-filled': this.layoutService.config().inputStyle === 'filled',
      'p-ripple-disabled': !this.layoutService.config().ripple,
    };
  }
}
