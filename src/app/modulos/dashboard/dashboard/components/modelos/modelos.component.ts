import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
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
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-modelos',
  standalone: true,
  imports: [CommonModule, CardModule, AvatarModule, FieldsetModule, ButtonModule,  DialogModule, RegistrarModeloComponent, ListboxModule,AccordionModule,ChipModule, TableModule, BadgeModule, InputTextModule, ReactiveFormsModule],
  providers: [ModelosService],
  templateUrl: './modelos.component.html',
  styleUrl: './modelos.component.scss'
})
export class ModelosComponent implements OnInit, AfterViewInit {

  form: FormGroup = new FormGroup({});

  nuevoModelo: boolean = false;
  notificaciones: any[] = []; 
  constructor(private modelosService:ModelosService, private messageService:MessageService, private router:Router, private usuariosService: UsuariosService, private fb: FormBuilder) { }
  ngAfterViewInit(): void {
    this.consultarNoticicaciones();
  }
  listaModelos: any[] = []; 
  fotoAleatoria: string = '';
    parametroBusqueda: string = '';
  abrirModal() {
    this.nuevoModelo = true;
  }

  ngOnInit(): void {
    this.consultarModelos();
    this.inicializarFormulario();
    this.escucharCampoBusqueda();
    this.consultarNoticicaciones();
  }

  inicializarFormulario() { 
    this.form = this.fb.group({
      busqueda: ['', [Validators.required]],
    });
  }

  cerrarDialogo(){
    this.nuevoModelo = false
    this.consultarModelos();
  }
  
  escucharCampoBusqueda(){
    this.form.get('busqueda')?.valueChanges.subscribe((busqueda: any) => {
      this.parametroBusqueda = busqueda
      if(this.parametroBusqueda != ''){
        this.consultarModelosPorParametro();  
      }
    })
  }

  consultarModelos(){
    this.modelosService.consultarModelos().subscribe({
      next: (response) => {
         if(response.status == 200){
          this.listaModelos = response.data;
           response.data.forEach((modelo: any) => {
           });
         }
      },
      error: (error) => {
        console.log(error);
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al consultar los modelos'});
      }
    });
  }

  consultarModelosPorParametro(){
      this.listaModelos = [];
      let parametros = {
        busqueda: this.parametroBusqueda
      }
       this.modelosService.consultarModelosPorParametro(parametros).subscribe({
      next: (response) => {
         if(response.status == 200){
          this.listaModelos = response.data;
              response.data.forEach((modelo: any) => {
          });
          console.log("CONSUILTA INFORMACION",this.listaModelos);
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
             console.log("MODELO",modelo);  
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

elimiarModelo(_t8: any) {
  const parametros = {
    idts_empleado: _t8.idts_empleado
  }
  this.modelosService.eliminarModelo(parametros).subscribe({
    next: (data) => {
      if(data.status == 200){
        this.messageService.add({severity:'success', summary: 'Exito', detail: 'Modelo eliminado correctamente'});
        this.consultarModelos();
      }
    },
    error: (error) => {
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al eliminar el modelo'});
    }
  })
}
 
reiniciarFiltros(){
  this.form.reset();
  this.parametroBusqueda = '';
  this.consultarModelos();
}
  


}
