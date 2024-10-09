import { Component } from '@angular/core';
import { LayoutService } from '../../service/app.layout.service';
import { CommonModule } from '@angular/common';
import { AppMenuitemComponent } from './app.menuitem.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, AppMenuitemComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Inicio',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard'] }
                ]
            },
            {
                label: 'Modulos',
                items: [
                    { label: 'Usuarios', icon: 'pi pi-fw pi-user-plus', routerLink: ['/dashboard/usuarios'] },
                    { label: 'Modelos', icon: 'pi pi-fw pi-users', routerLink: ['/dashboard/modelos'] },
                 
                ]
            },

        ];
    }

}
