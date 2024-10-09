import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ModelosService } from '../../services/modelos.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-editar-habilidad',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InputTextModule, ButtonModule, InputTextareaModule],
  templateUrl: './editar-habilidad.component.html',
  styleUrl: './editar-habilidad.component.scss'
})
export class EditarHabilidadComponent implements OnInit, OnChanges {
  formulario : FormGroup = new FormGroup({});
  _idModelo?: number;  
  @Input() set idModelo(value: number){
    this._idModelo = value;
  }

  _informacionEditar?: any;

  @Input() set informacionEditar(value: any) {
    this._informacionEditar = value;
    if (this.formulario) {
      this.actualizarFormulario();
    }
  }

  @Output() consultarModelosEmit: EventEmitter<any> = new EventEmitter<any>();  
  
    constructor(private fb: FormBuilder, private messageService: MessageService,
    private modelosService:ModelosService,  private router:Router) {
      this.inicializarFormulario();
     }
      
    ngOnChanges(changes: SimpleChanges): void {
      if (changes['informacionEditar'] && changes['informacionEditar'].currentValue) {
        this.actualizarFormulario();
      }
    }

    ngOnInit(): void {
    }
  
    inicializarFormulario(){
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

    guardarComentario(){
      console.log("---->", this._informacionEditar);
      if(this.formulario.get('nombre')?.value && this.formulario.get('descripcion')?.value){
        const parametros = {
          idts_habilidad:  this._informacionEditar.idts_habilidades,
          nombre: this.formulario.get('nombre')?.value,
          descripcion: this.formulario.get('descripcion')?.value
        };
        console.log(parametros);
        
        this.modelosService.editarHabilidad(parametros).subscribe({
          next: (data) => {
            if(data.status == 200){
              this.messageService.add({severity:'success', summary: 'Exito', detail: 'Conocimiento guardado correctamente'});
              this.formulario.reset();
              setTimeout(() => {
                this.router.navigate(['/dashboard/modelos']);
              }, 500);
            } else{
              this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al guardar el conocimiento'});
            }
          },
          error: (error) => {
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al guardar el conocimiento'});
          }
        })

      } else{
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Todos los campos son obligatorios'});
      }

    }

    get idModelo(){
      return this._idModelo as any;
    }

    get informacionEditar() {
      return this._informacionEditar as any;
    }

}
