import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
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
import { ConfirmationService, MessageService } from 'primeng/api';
import { ModelosService } from '../../services/modelos.service';
import { ActualizarfotoComponent } from '../actualizarfoto/actualizarfoto.component';
import { NuevoConocimientoComponent } from '../nuevo-conocimiento/nuevo-conocimiento.component';
import { NuevaHabilidadComponent } from '../nueva-habilidad/nueva-habilidad.component';
import { ModelosComponent } from '../modelos/modelos.component';
import { SidebarModule } from 'primeng/sidebar';
import { UsuariosService } from '../../services/usuarios.service';
import { EditarConocimientoComponent } from '../editar-conocimiento/editar-conocimiento.component';
import { EditarHabilidadComponent } from '../editar-habilidad/editar-habilidad.component';
import { Router } from '@angular/router';
import { NuevaFotoComponent } from '../nueva-foto/nueva-foto.component';
import { ComentarioAdministradorComponent } from '../comentario-administrador/comentario-administrador.component';
import { CalendarModule } from 'primeng/calendar';
import { MonitorService } from '../../services/monitor.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

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
    EditarHabilidadComponent,
    NuevaFotoComponent,
    ComentarioAdministradorComponent,
    CalendarModule,
    ConfirmDialogModule
  ],
  providers: [ModelosService, ModelosComponent,ConfirmationService],
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
  uploadedFiles: { base64: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private modelosService: ModelosService,
    private modelosComponent: ModelosComponent,
    private usuariosService: UsuariosService,
    private router: Router,
    private monitorService:MonitorService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();
    const modelo = history.state.modelo;

    this.informacionModelo = modelo;
    console.log("INFORMACION MODELO", this.informacionModelo);
    if (this.informacionModelo?.length > 0) {
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
    this.formulario.get('horaInicio')?.setValue(datos.horaInicio);
    this.formulario.get('horaFin')?.setValue(datos.horaFin);

    datos.actitud_positiva == 1
      ? this.formulario.get('actitud_positiva')?.setValue(true)
      : this.formulario.get('actitud_positiva')?.setValue(false);
    datos.profesionalismo == 1
      ? this.formulario.get('profesionalismo')?.setValue(true)
      : this.formulario.get('profesionalismo')?.setValue(false);
    datos.adaptabilidad == 1
      ? this.formulario.get('adaptabilidad')?.setValue(true)
      : this.formulario.get('adaptabilidad')?.setValue(false);
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
      horaInicio: [''],
      horaFin: [''],
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

  eliminarFoto(foto: any) {
    const parametros = {
      idts_fotos: foto.idts_fotos,
    };

    this.modelosService.eliminarFoto(parametros).subscribe({
      next: (data) => {
        if (data.status == 200) {
          this.messageService.add({
            severity: 'success',
            summary: 'Exito',
            detail: 'Foto eliminada correctamente',
          });
          this.informacionModelo.fotos = this.informacionModelo.fotos.filter(
            (foto: any) => foto.idts_fotos != parametros.idts_fotos
          );
        }
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al eliminar la foto',
        });
      },
    });
  }

  crearComentario() {
    this.visible = true;
    this.pantalla = 'comentarioMonitor';
    this.titulo = 'Comentario Monitor';
  }

  comentarioAdministrador() {
    this.visible = true;
    this.pantalla = 'comentarioAdministrador';
    this.titulo = 'Comentario Administrador';
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
        fechaInicio: this.formulario.get('horaInicio')?.value
          ? typeof this.formulario.get('horaInicio')?.value === 'string'
        ? this.formulario.get('horaInicio')?.value
        : new Date(
            this.formulario.get('horaInicio')?.value
          ).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          : '',
        fechaFin: this.formulario.get('horaFin')?.value
          ? typeof this.formulario.get('horaFin')?.value === 'string'
        ? this.formulario.get('horaFin')?.value
        : new Date(this.formulario.get('horaFin')?.value).toLocaleTimeString(
            [],
            { hour: '2-digit', minute: '2-digit' }
          )
          : '',
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
        let checked = !this.formulario.get('actitud_positiva')?.value
          ? false
          : true;
        this.formulario.get('actitud_positiva')?.setValue(checked);
        let parametros = {
          idts_empleado: this.informacionModelo.idts_empleado,
          dato: this.formulario.get('actitud_positiva')?.value,
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
        });
        break;
      case '2':
        let checked2 = !this.formulario.get('profesionalismo')?.value
          ? false
          : true;
        this.formulario.get('profesionalismo')?.setValue(checked2);
        let parametros2 = {
          idts_empleado: this.informacionModelo.idts_empleado,
          dato: this.formulario.get('profesionalismo')?.value,
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
        });
        break;
      case '3':
        let checked3 = !this.formulario.get('adaptabilidad')?.value
          ? false
          : true;
        this.formulario.get('adaptabilidad')?.setValue(checked3);
        let parametros3 = {
          idts_empleado: this.informacionModelo.idts_empleado,
          dato: this.formulario.get('adaptabilidad')?.value,
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
        });
        break;
    }
  }

  crearConocimiento() {
    this.visible = true;
    this.pantalla = 'nuevoConocimiento';
    this.titulo = 'Nuevo Conocimiento';
  }

  crearHabilidad() {
    this.visible = true;
    this.pantalla = 'nuevaHabilidad';
    this.titulo = 'Nueva Habilidad';
  }

  consultarModelos() {
    this.visible = false;
  }

  marcarNoficicacionLeida(notificacionLeida: any) {

      this.confirmationService.confirm({
          header: 'Alerta de confirmación',
          message: 'Estás por marcar este comentario como leído, pero no se ha agregado a los conocimientos o habilidades. Si lo marcas, deberás actualizarlo manualmente.',
          acceptIcon: 'pi pi-check mr-2',
          icon: 'pi pi-exclamation-triangle',
          rejectIcon: 'pi pi-times mr-2',
          acceptLabel: 'Aceptar',
          rejectLabel: 'Cancelar',
          rejectButtonStyleClass: 'p-button-sm',
          acceptButtonStyleClass: 'p-button-outlined p-button-sm',
          accept: () => {
            this.notificacionLeida(notificacionLeida);
          },
          reject: () => {
              this.messageService.add({ severity: 'error', summary: 'Cancelado', detail: 'Acción cancelada por el usuario', life: 3000 });
          }
      });
  
  }

  notificacionLeida(notificacionLeida: any) {
    const parametros = {
      idts_notificaciones: notificacionLeida.idts_notificaciones,
    };

    this.usuariosService.marcarNotificacionLeida(parametros).subscribe({
      next: (data) => {
        if (data.status == 200) {
          this.messageService.add({
            severity: 'success',
            summary: 'Exito',
            detail: 'Notificación marcada como leida',
          });
          setTimeout(() => {
            this.router.navigate(['/dashboard/modelos']);
          }, 2000);
        }
      },
    });
  }

  eliminarConocimiento(conocimiento: any) {
    const parametros = {
      idts_empleado: this.informacionModelo.idts_empleado,
      idts_conocimiento: Number(conocimiento.idts_conocimiento),
    };

    this.modelosService.eliminarConocimiento(parametros).subscribe({
      next: (data) => {
        if (data.status == 200) {
          this.messageService.add({
            severity: 'success',
            summary: 'Exito',
            detail: 'Conocimiento eliminado correctamente',
          });
          this.informacionModelo.conocimientos =
            this.informacionModelo.conocimientos.filter(
              (conocimiento: any) =>
                conocimiento.idts_conocimiento != parametros.idts_conocimiento
            );
        }
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al eliminar conocimiento',
        });
      },
    });
  }

  eliminarHabilidad(conocimiento: any) {
    console.log(conocimiento);
    const parametros = {
      idts_empleado: this.informacionModelo.idts_empleado,
      idts_habilidad: Number(conocimiento.idts_habilidades),
    };

    this.modelosService.eliminarHabilidad(parametros).subscribe({
      next: (data) => {
        if (data.data) {
          this.messageService.add({
            severity: 'success',
            summary: 'Exito',
            detail: 'Conocimiento eliminado correctamente',
          });

          this.informacionModelo.conocimientos =
            this.informacionModelo.habilidades.filter(
              (conocimiento: any) =>
                conocimiento.idts_habilidad != parametros.idts_habilidad
            );
        }
      },
      error: (error) => {
        console.log(this.informacionModelo);
        this.informacionModelo.habilidades =
          this.informacionModelo.habilidades.filter(
            (conocimiento: any) =>
              conocimiento.idts_habilidades != parametros.idts_habilidad
          );
      },
    });
  }

  nuevaFoto() {
    this.visible = true;
    this.pantalla = 'nuevaFoto';
    this.titulo = 'Nueva Foto';
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

  onUpload(event: any) {
    const files = event.files;

    for (let file of files) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const base64 = e.target.result;
        this.uploadedFiles.push({
          base64: base64,
        });
        this.addFotoToForm(base64);
      };

      reader.readAsDataURL(file); 
    }
  }

  addFotoToForm(base64: string) {
    const fotosFormArray = this.formulario.get('fotos') as FormArray;
    fotosFormArray.push(this.fb.control(base64));
    console.log(this.formulario.getRawValue());
  }

  guardarNuevaFoto(parametros: any) {
    this.modelosService.nuevaFoto(parametros).subscribe({
      next: (data) => {
        if (data.status == 200) {
          this.messageService.add({
            severity: 'success',
            summary: 'Exito',
            detail: 'Foto guardada correctamente',
          });
          this.informacionModelo.fotos.push(data.data);
          this.router.navigate(['/dashboard/modelos']);
        }
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al guardar la foto',
        });
      },
    });

    
  }

  agragarComentarioAutomatico(argumentos: any) {
      let parametros = {
        idts_modelo: argumentos.idts_modelo,
        nombre: argumentos.nombre, 
        descripcion: argumentos.descripcion,
        tipo_comentario:argumentos.tipo_comentario
      }
      this.monitorService.guardarComentarioAdministrador(parametros).subscribe({
        next: (data) => {
           console.log(data);
           if(data.status == 200){
              this.messageService.add({severity:'success', summary:'Exito', detail:'Comentario guardado correctamente'});
              this.notificacionLeida(argumentos);
             this.formulario.reset();
             setTimeout(() => {
               this.router.navigate(['/dashboard/modelos']);  
             }, 1000);
           }
        },
        error: (error) => {
          this.messageService.add({severity:'error', summary:'Error', detail:'Error al guardar comentario'});
        }
      })
    }
    
    cerrarModal() {
      this.visible = false;
    }
      
  
}
