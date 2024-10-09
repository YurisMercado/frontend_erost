import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { ModelosService } from '../../services/modelos.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actualizarfoto',
  standalone: true,
  imports: [CommonModule, FileUploadModule, ReactiveFormsModule],
  templateUrl: './actualizarfoto.component.html',
  styleUrl: './actualizarfoto.component.scss'
})
export class ActualizarfotoComponent  implements OnInit{

    formulario: FormGroup = new FormGroup({});
    uploadedFiles?: string;

    _idts_fotos: any; 
    @Input() set idts_fotos(value: any){
        this._idts_fotos = value;
    }
   
    constructor(private fb: FormBuilder, private modelosService:ModelosService, private messageService: MessageService, private router:Router) { }
   
    ngOnInit(): void {
        this.inicializarFormulario();
    }

    inicializarFormulario(){
        this.formulario = this.fb.group({
            foto: ['']
        });
    }

    onUpload(event: any) {
      const files = event.files;
      for (let file of files) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const base64 = e.target.result;
          this.uploadedFiles = base64;
          console.log(base64);
        };
        reader.readAsDataURL(file); 
      }
    }
    
    guardarFoto(){
      if(this.uploadedFiles){
         const parametros = {
          idts_foto: Number(this._idts_fotos),
            base64: this.uploadedFiles
          };
          
          this.modelosService.acualizarFoto(parametros).subscribe({
            next: (data: any) => {
               if(data.status == 200){
                  this.messageService.add({severity:'success', summary: 'Exito', detail: 'Foto actualizada correctamente'});
                  setTimeout(() => {
                    this.router.navigate(['/dashboard/modelos']);
                  }, 1000);
               }  
            },
            error: () => {
               this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al actualizar la foto'});
            }
          });

         }
    }

    get idts_fotos() {
        return this._idts_fotos;
    }

}
