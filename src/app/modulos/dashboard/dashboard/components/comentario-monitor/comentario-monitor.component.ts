import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Button, ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MonitorService } from '../../services/monitor.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-comentario-monitor',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InputTextareaModule, ButtonModule, ToastModule, DropdownModule], 
  templateUrl: './comentario-monitor.component.html',
  styleUrl: './comentario-monitor.component.scss'
})
export class ComentarioMonitorComponent implements OnInit {


  formulario: FormGroup = new FormGroup({});
  informacion: any = {};  
  _idModelo?: number;  
   tipoComentario: any[] | undefined;
  @Input() set idModelo(value: number){
    this._idModelo = value;
  }

  constructor(private fb:FormBuilder, private monitorService:MonitorService,private messageService: MessageService) { } 

  ngOnInit(): void {
    this.inicializarFormulario();
    let usuario = localStorage.getItem('usuario');
    this.informacion = usuario ? JSON.parse(usuario) : null;
    this.tipoComentario = [
      {label: 'Habilidad', value: 'habilidad'},
      {label: 'Conocimiento', value: 'conocimiento'}
    ]
  }

  inicializarFormulario(){
    this.formulario = this.fb.group({
      comentario: [''],
      tipo: ['']
    })
  }

  guardarComentario() {
    let parametros = {

      idts_modelo: this.idModelo,
      nombre_registrador: this.informacion.nombre,
      descripcion: this.formulario.value.comentario,
      tipo_comentario: this.formulario.value.tipo.value
    }
    console.log(parametros);
    this.monitorService.guardarComentarioMonitor(parametros).subscribe({
      next: (data) => {
         console.log(data);
         if(data.status == 200){
            this.messageService.add({severity:'success', summary:'Exito', detail:'Comentario guardado correctamente'});
           this.formulario.reset();
         }
      },
      error: (error) => {
        this.messageService.add({severity:'error', summary:'Error', detail:'Error al guardar comentario'});
      }
    })
  }

  get idModelo(){
    return this._idModelo as number ;
  } 

}
