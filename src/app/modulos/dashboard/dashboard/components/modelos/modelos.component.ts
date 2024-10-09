import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { FieldsetModule } from 'primeng/fieldset';
import { RegistrarModeloComponent } from '../registrar-modelo/registrar-modelo.component';
import { ListboxModule } from 'primeng/listbox';
import { AccordionModule } from 'primeng/accordion';
import { ChipModule } from 'primeng/chip';
import { ModelosService } from '../../services/modelos.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import {  TableModule } from 'primeng/table';
import { BadgeModule } from 'primeng/badge';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-modelos',
  standalone: true,
  imports: [CommonModule, CardModule, FieldsetModule, ButtonModule,  DialogModule, RegistrarModeloComponent, ListboxModule,AccordionModule,ChipModule, TableModule, BadgeModule],
  providers: [ModelosService],
  templateUrl: './modelos.component.html',
  styleUrl: './modelos.component.scss'
})
export class ModelosComponent implements OnInit {



  nuevoModelo: boolean = false;
  notificaciones: any[] = []; 
  constructor(private modelosService:ModelosService, private messageService:MessageService, private router:Router, private usuariosService: UsuariosService) { }
  listaModelos: any[] = []; 
  fotoAleatoria: string = '';

  abrirModal() {
    this.nuevoModelo = true;
  }

  ngOnInit(): void {
    this.consultarModelos();
   
    
  }

  cerrarDialogo(){
    this.nuevoModelo = false
    this.consultarModelos();
  }

  consultarModelos(){
    this.modelosService.consultarModelos().subscribe({
      next: (response) => {
         if(response.status == 200){
          this.listaModelos = response.data;
           response.data.forEach((modelo: any) => {
           });
           this.consultarNoticicaciones();
         }
      },
      error: (error) => {
        console.log(error);
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al consultar los modelos'});
      }
    });
  }

 
  verModelo(modelo: any): void {
      this.router.navigate(['/dashboard/detalle-modelo'], {state: {modelo}});
  }


  
  consultarNoticicaciones(){
    this.usuariosService.consultarNotificaciones().subscribe({
      next: (response) => {
         if(response.status == 200){
           this.notificaciones = response.data;
           let arrayNotificaciones: any[] = []; 
           this.listaModelos.map((modelo: any) => {
              this.notificaciones.map((notificacion: any, i: any) => {
                if(modelo.idts_empleado == notificacion.idts_modelo){
                  modelo.notificacion = true;
                  modelo.cantidadNotificaciones =  i+1;
                  arrayNotificaciones.push(notificacion);
                  modelo.detalleNotificacion = arrayNotificaciones
                }
              })
            
           })
          console.log(this.listaModelos);
         }
      },
      error: (error) => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al consultar las notificaciones'});
      }
    })
  }

  obtenerRolConectado(){
    let rol = localStorage.getItem('rol');
    return rol
  }

}
