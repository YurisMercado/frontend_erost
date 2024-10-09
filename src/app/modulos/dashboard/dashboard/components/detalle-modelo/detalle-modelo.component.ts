import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { FieldsetModule } from 'primeng/fieldset';
import { GalleriaModule } from 'primeng/galleria';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { ComentarioMonitorComponent } from '../comentario-monitor/comentario-monitor.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ModelosService } from '../../services/modelos.service';
import { ActualizarfotoComponent } from '../actualizarfoto/actualizarfoto.component';
import { NuevoConocimientoComponent } from '../nuevo-conocimiento/nuevo-conocimiento.component';
import { NuevaHabilidadComponent } from '../nueva-habilidad/nueva-habilidad.component';
import { ModelosComponent } from '../modelos/modelos.component';
import { SidebarModule } from 'primeng/sidebar';
import { UsuariosService } from '../../services/usuarios.service';
import { EditarConocimientoComponent } from '../editar-conocimiento/editar-conocimiento.component';
import { EditarHabilidadComponent } from '../editar-habilidad/editar-habilidad.component';

@Component({
  selector: 'app-detalle-modelo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GalleriaModule,
    CardModule,
    InputTextModule,
    AccordionModule,
    ChipModule,
    TableModule,
    ButtonModule,
    FieldsetModule,
    CheckboxModule,
    DialogModule,
    ComentarioMonitorComponent,
    ToastModule,
    ActualizarfotoComponent,
    NuevoConocimientoComponent,
    NuevaHabilidadComponent,
    SidebarModule,
    EditarConocimientoComponent,
    EditarHabilidadComponent
  ],
  providers: [ModelosService, ModelosComponent],
  templateUrl: './detalle-modelo.component.html',
  styleUrl: './detalle-modelo.component.scss',
})
export class DetalleModeloComponent implements OnInit {



  formulario: FormGroup = new FormGroup({});
  checked: boolean = false;
  informacionModelo: any = {};
  responsiveOptions: any[] | undefined;
  visible: boolean = false;
  pantalla: string = '';
  titulo: string = '';
  idts_fotos: string = '';  
  sidebarVisible: boolean = false;  
  informacionSeleccionada: any = {};

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private modelosService: ModelosService,
    private modelosComponent: ModelosComponent,
    private  usuariosService: UsuariosService 
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();
    const modelo = history.state.modelo;

    this.informacionModelo = modelo;
    if (this.informacionModelo?.detalleNotificacion?.length > 0) {
      this.sidebarVisible = true;
    }
    this.setearInformacionModelo(modelo);
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 5,
      },
      {
        breakpoint: '768px',
        numVisible: 3,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
      },
    ];
    this.obtenerRolConectado();
    if (this.obtenerRolConectado() == '2') {
      this.formulario.disable();
    }
  }

  setearInformacionModelo(datos: any) {
    this.formulario.get('nombre')?.setValue(datos.nombre);
    this.formulario.get('email')?.setValue(datos.email);
    this.formulario.get('edad')?.setValue(datos.edad);
    datos.actitud_positiva == 1 ? this.formulario.get('actitud_positiva')?.setValue(true) : this.formulario.get('actitud_positiva')?.setValue(false);
    datos.profesionalismo == 1 ? this.formulario.get('profesionalismo')?.setValue(true) : this.formulario.get('profesionalismo')?.setValue(false);
    datos.adaptabilidad == 1 ? this.formulario.get('adaptabilidad')?.setValue(true) : this.formulario.get('adaptabilidad')?.setValue(false);
  }

  inicializarFormulario() {
    this.formulario = this.fb.group({
      nombre: [''],
      email: [''],
      edad: [''],
      fotos: [''],
      actitud_positiva: [''],
      profesionalismo: [''],
      adaptabilidad: [''],
    });
  }

  obtenerRolConectado() {
    return localStorage.getItem('rol');
  }

  editarFoto(foto: any) {
     this.visible = true;
    this.pantalla = 'actualizarFoto';
    this.titulo = 'Actualizar Foto';
    this.idts_fotos = foto.idts_fotos;
  }

  crearComentario() {
    this.visible = true;
    this.pantalla = 'comentarioMonitor';
    this.titulo = 'Comentario Monitor';
  }

  actualizarInformacion() {
    if (
      this.formulario.get('nombre')?.value === '' &&
      this.formulario.get('email')?.value === '' &&
      this.formulario.get('edad')?.value === ''
    ) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Debe llenar al menos un campo',
      });
      return;
    } else {
      let parametros = {
        idts_empleado: this.informacionModelo.idts_empleado,
        nombre: this.formulario.get('nombre')?.value,
        email: this.formulario.get('email')?.value,
        edad: this.formulario.get('edad')?.value,
      };

      this.modelosService.actualizarModelo(parametros).subscribe({
        next: (data) => {
          if (data.status == 200) {
            this.messageService.add({
              severity: 'success',
              summary: 'Exito',
              detail: 'Información actualizada correctamente',
            });
          }
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al actualizar información',
          });
        },
      });
    }
  }

  guardarActidu(campo: string) {
    switch (campo) {
      case '1':
        let checked = !this.formulario.get('actitud_positiva')?.value ? false : true;
        this.formulario.get('actitud_positiva')?.setValue(checked);
        let parametros = {
          idts_empleado: this.informacionModelo.idts_empleado,
          dato:  this.formulario.get('actitud_positiva')?.value ,
          tipo: 'actitud_positiva',
        };
        this.modelosService.guardarActitud(parametros).subscribe({
          next: (data) => {
            if (data.status == 200) {
              this.messageService.add({
                severity: 'success',
                summary: 'Exito',
                detail: 'Actitud guardada correctamente',
              });
            }
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error al guardar actitud',
            });
          },
        })
        break;
      case '2':
        let checked2 = !this.formulario.get('profesionalismo')?.value ? false : true;
        this.formulario.get('profesionalismo')?.setValue(checked2);
        let parametros2 = {
          idts_empleado: this.informacionModelo.idts_empleado,
          dato:  this.formulario.get('profesionalismo')?.value ,
          tipo: 'profesionalismo',
        };
        console.log(parametros2);
        this.modelosService.guardarProfesinalismo(parametros2).subscribe({
          next: (data) => {
            if (data.status == 200) {
              this.messageService.add({
                severity: 'success',
                summary: 'Exito',
                detail: 'Actitud guardada correctamente',
              });
            }
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error al guardar actitud',
            });
          },
        })
        break;
      case '3':
        let checked3 = !this.formulario.get('adaptabilidad')?.value ? false : true;
        this.formulario.get('adaptabilidad')?.setValue(checked3);
        let parametros3 = {
          idts_empleado: this.informacionModelo.idts_empleado,
          dato:  this.formulario.get('adaptabilidad')?.value ,
          tipo: 'adaptabilidad',
        };
        console.log(parametros3);
        this.modelosService.guardarAdaptabilidad(parametros3).subscribe({
          next: (data) => {
            if (data.status == 200) {
              this.messageService.add({
                severity: 'success',
                summary: 'Exito',
                detail: 'Actitud guardada correctamente',
              });
            }
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error al guardar actitud',
            });
          },
        })
        break;
    }
  }

  crearConocimiento(){
    this.visible = true;
    this.pantalla = 'nuevoConocimiento';
    this.titulo = 'Nuevo Conocimiento';
  }

  crearHabilidad(){
    this.visible = true;
    this.pantalla = 'nuevaHabilidad';
    this.titulo = 'Nueva Habilidad';
  }

  consultarModelos(){
    this.visible = false;
    this.modelosComponent.consultarModelos();

  }

  marcarNoficicacionLeida(notificacionLeida: any) {
     console.log(notificacionLeida);
     const parametros = {
      idts_notificaciones: notificacionLeida.idts_notificaciones
     }

      this.usuariosService.marcarNotificacionLeida(parametros).subscribe({
        next: (data) => {
          if(data.status == 200){
            this.messageService.add({severity:'success', summary: 'Exito', detail: 'Notificación marcada como leida'});
            this.consultarModelos();
          }
        }
      })
  }

  eliminarConocimiento(conocimiento: any) {
     const parametros = {
      idts_empleado: this.informacionModelo.idts_empleado,
      idts_conocimiento: Number(conocimiento.idts_conocimiento)
     }

     this.modelosService.eliminarConocimiento(parametros).subscribe({
        next: (data) => {
          if(data.status == 200){
            this.messageService.add({severity:'success', summary: 'Exito', detail: 'Conocimiento eliminado correctamente'});
            this.informacionModelo.conocimientos = this.informacionModelo.conocimientos.filter((conocimiento: any) => conocimiento.idts_conocimiento != parametros.idts_conocimiento);
          }
        },
        error: (error) => {
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al eliminar conocimiento'});
        }
     })
  }

  eliminarHabilidad(conocimiento: any) {
    console.log(conocimiento);
    const parametros = {
     idts_empleado: this.informacionModelo.idts_empleado,
     idts_habilidad: Number(conocimiento.idts_habilidades)
    }

    this.modelosService.eliminarHabilidad(parametros).subscribe({
       next: (data) => {
         if(data.data){
           this.messageService.add({severity:'success', summary: 'Exito', detail: 'Conocimiento eliminado correctamente'});
          
           this.informacionModelo.conocimientos = this.informacionModelo.habilidades.filter((conocimiento: any) => conocimiento.idts_habilidad != parametros.idts_habilidad);
         }
       },
        error: (error) => {
          console.log(this.informacionModelo);
          this.informacionModelo.habilidades = this.informacionModelo.habilidades.filter((conocimiento: any) => conocimiento.idts_habilidades != parametros.idts_habilidad);
        }
    })
 }

 editarConocimiento(_t135: any) {
    this.visible = true;
    this.pantalla = 'editarConocimiento';
    this.titulo = 'Editar Conocimiento';
    this.informacionSeleccionada = _t135;
 }

 editarHabilidad(_t172: any) {
  this.visible = true;
  this.pantalla = 'editarHabilidad';
  this.titulo = 'Editar Habilidad';
  this.informacionSeleccionada = _t172;
}
    

}
