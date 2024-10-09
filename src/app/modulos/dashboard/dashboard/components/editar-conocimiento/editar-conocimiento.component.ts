import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ModelosService } from '../../services/modelos.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-editar-conocimiento',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InputTextModule, ButtonModule, InputTextareaModule],
  templateUrl: './editar-conocimiento.component.html',
  styleUrls: ['./editar-conocimiento.component.scss'] // Corregido styleUrls en lugar de styleUrl
})
export class EditarConocimientoComponent implements OnInit, OnChanges {

  formulario: FormGroup = new FormGroup({});
  _informacionEditar?: any;

  @Input() set informacionEditar(value: any) {
    this._informacionEditar = value;
    if (this.formulario) {
      this.actualizarFormulario();
    }
  }

  @Output() consultarModelosEmit: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder, 
    private messageService: MessageService,
    private modelosService: ModelosService,  
    private router: Router
  ) { 
    this.inicializarFormulario();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['informacionEditar'] && changes['informacionEditar'].currentValue) {
      this.actualizarFormulario();
    }
  }

  ngOnInit(): void {
    
  }

  inicializarFormulario() {
    this.formulario = this.fb.group({
      nombre: [''],
      descripcion: ['']
    });
  }

  actualizarFormulario() {
    if (this._informacionEditar) {
      this.formulario.get('nombre')?.setValue(this._informacionEditar.nombre);
      this.formulario.get('descripcion')?.setValue(this._informacionEditar.descripcion);
    }
  }

  guardarComentario() {
    if (this.formulario.valid) {
      const parametros = {
        idts_conocimiento: this._informacionEditar.idts_conocimiento,
        nombre: this.formulario.get('nombre')?.value,
        descripcion: this.formulario.get('descripcion')?.value
      };

      this.modelosService.editarConocimiento(parametros).subscribe({
        next: (data) => {
          if (data.status == 200) {
            this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Conocimiento guardado correctamente' });
            this.formulario.reset();
            setTimeout(() => {
              this.router.navigate(['/dashboard/modelos']);
            }, 1000);
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al guardar el conocimiento' });
          }
        },
        error: (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al guardar el conocimiento' });
        }
      });

    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Todos los campos son obligatorios' });
    }
  }

  get informacionEditar() {
    return this._informacionEditar as any;
  }
}
