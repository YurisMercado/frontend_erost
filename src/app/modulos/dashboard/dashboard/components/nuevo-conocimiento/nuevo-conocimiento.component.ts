import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ModelosService } from '../../services/modelos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-conocimiento',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule],
  templateUrl: './nuevo-conocimiento.component.html',
  styleUrl: './nuevo-conocimiento.component.scss'
})
export class NuevoConocimientoComponent  implements OnInit{

  formulario : FormGroup = new FormGroup({});
  _idModelo?: number;  
  @Input() set idModelo(value: number){
    this._idModelo = value;
  }
  @Output() consultarModelosEmit: EventEmitter<any> = new EventEmitter<any>();  
  
    constructor(private fb: FormBuilder, private messageService: MessageService,
      private modelosService:ModelosService,  private router:Router) { }
  
    ngOnInit(): void {
      this.inicializarFormulario();
    }
  
    inicializarFormulario(){
      this.formulario = this.fb.group({
        nombre: [''],
        descripcion: ['']
      });
    }

    guardarComentario(){

      if(this.formulario.get('nombre')?.value && this.formulario.get('descripcion')?.value){
        const parametros = {
          idts_modelo: this.idModelo,
          nombre: this.formulario.get('nombre')?.value,
          descripcion: this.formulario.get('descripcion')?.value
        };
        
        this.modelosService.guardarConocimiento(parametros).subscribe({
          next: (data) => {
            if(data.status == 200){
              this.messageService.add({severity:'success', summary: 'Exito', detail: 'Conocimiento guardado correctamente'});
              this.formulario.reset();
              setTimeout(() => {
                this.router.navigate(['/dashboard/modelos']);
              }, 1000);
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

}
