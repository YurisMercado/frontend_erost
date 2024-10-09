import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { NuevoUsuarioComponent } from '../nuevo-usuario/nuevo-usuario.component';
import { GestionRolService } from '../../services/gestion-rol.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    DialogModule,
    NuevoUsuarioComponent,
    ToastModule,
  ],
  providers: [UsuariosService],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss',
})
export class UsuariosComponent implements OnInit {

  usuarios: any[] = [];
  listaRoles: any[] = [];
  nuevoUsuario: boolean = false;
  constructor(
    private usuariosService: UsuariosService,
    private gestionRolService: GestionRolService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.consultarUsuarios();
    this.consultarListaRoles();
  }

  consultarUsuarios() {
    this.usuariosService.consultarUsuarios().subscribe({
      next: (data: any) => {
        if (data.status == 200) {
          this.usuarios = data.data;
        }
      },
      error: (error: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error.message,
        });
      },
    });
  }

  consultarListaRoles() {
    this.gestionRolService.consultarRoles().subscribe({
      next: (data: any) => {
        if (data.status == 200) {


          this.listaRoles = data.data;
        }
      },
      error: (error: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error.message,
        });
      },
    });
  }

  registrarUsuario(event: any) {
    this.usuariosService.registrarUsuario(event).subscribe({
      next: (data: any) => {
        console.log('data: ', data);
        if (data.status == 200) {
          this.messageService.add({
            severity: 'success',
            summary: 'Exito',
            detail: data.message,
          });
          this.consultarUsuarios();
          this.nuevoUsuario = false;
        }
      },
      error: (error: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error.message,
        });
      },
    });
  }

  usuarioSeleccionado(usuario: any) {
    console.log(usuario);
  }

  obtenerRolConectado(){
    let rol = localStorage.getItem('rol');
    return rol;
  }

  monstrarDialogo() {
    this.nuevoUsuario = true;
  }

  inactivarUsuiario(_t25: any) {
     let estadoActual = _t25.estado;
     let estado = estadoActual == 'ACTIVO' ? 'INACTIVO' : 'ACTIVO';

    const parametros = {
      idts_empleado: _t25.idts_empleado,
      estado: estado,
    }

    // servicio

    this.usuariosService.inactivarUsuario(parametros).subscribe({
      next: (data: any) => {
        if (data.status == 200) {
          this.consultarUsuarios();
          this.messageService.add({
            severity: 'success',
            summary: 'Exito',
            detail: data.message,
          });
        }
      },
      error: (error: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error.message,
        });
      }
    })
  }

}
