import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { AccordionModule } from 'primeng/accordion';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ModelosService } from '../../services/modelos.service';

@Component({
  selector: 'app-registrar-modelo',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CardModule,
    FieldsetModule,
    ButtonModule,
    DialogModule,
    DropdownModule,
    FileUploadModule,
    InputTextModule,
    AccordionModule,
    InputTextareaModule,
    TableModule,
    ToastModule
  ],
  templateUrl: './registrar-modelo.component.html',
  styleUrl: './registrar-modelo.component.scss',
})
export class RegistrarModeloComponent {
  formulario: FormGroup = new FormGroup({}); 
  uploadedFiles: {  base64: string }[] = [];
  conocimientos: any[] = [];
  habilidades: any[] = [];
  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private modelosService:ModelosService
  ) {}

  @Output() cerrarDialogoEmit: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  inicializarFormulario() {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required]],
      edad: ['', [Validators.required]],
      cargo: ['', [Validators.required]],
      fotos: this.fb.array([], [Validators.required]),
      rol: ['', [Validators.required]],
      habilidad:  [''],
      descripcionHabidad: [''],
      conocimiento:  [''], 
      descripcionConocimiento: [''],
    });
  }

  onUpload(event: any) {
    const files = event.files;
  
    // Recorre cada archivo seleccionado
    for (let file of files) {
      const reader = new FileReader();
      
      reader.onload = (e: any) => {
        const base64 = e.target.result;
        this.uploadedFiles.push({
          base64: base64
        });
        this.addFotoToForm(base64); // También lo agregamos al formulario
      };
  
      reader.readAsDataURL(file); // Convierte el archivo a base64
    }
  }
  
  // Método para agregar el base64 al FormArray de fotos
  addFotoToForm(base64: string) {
    const fotosFormArray = this.formulario.get('fotos') as FormArray;
    fotosFormArray.push(this.fb.control(base64));
    console.log(this.formulario.getRawValue());
  }

  agregarHabilidad(){
    if(this.formulario.get('habilidad')?.value === '' || this.formulario.get('descripcionHabidad')?.value === ''){
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Debe llenar todos los campos'});
      return;
    }
    const param = {
      nombre: this.formulario.get('habilidad')?.value,
      descripcion: this.formulario.get('descripcionHabidad')?.value
    }

    this.habilidades.push(param);
    this.formulario.get('habilidad')?.setValue('');
    this.formulario.get('descripcionHabidad')?.setValue('');
  }

  agregarConocimiento(){
    if(this.formulario.get('conocimiento')?.value === '' || this.formulario.get('descripcionConocimiento')?.value === ''){
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Debe llenar todos los campos'});
      return;
    }
    const param = {
      nombre: this.formulario.get('conocimiento')?.value,
      descripcion: this.formulario.get('descripcionConocimiento')?.value
    }
    this.conocimientos.push(param);
    this.formulario.get('conocimiento')?.setValue('');
    this.formulario.get('descripcionConocimiento')?.setValue('');

  }

  guardar(){

    if(this.formulario.get('nombre')?.value === '' || this.formulario.get('email')?.value === '' || this.formulario.get('edad')?.value === '' && this.formulario.get('fotos')?.value.length === 0 ){
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Debe llenar todos los campos'});
      return;
    }
    const parametros = {
      nombre: this.formulario.get('nombre')?.value,
      email: this.formulario.get('email')?.value,
      edad: this.formulario.get('edad')?.value,
      fotos: this.formulario.get('fotos')?.value,
      habilidades: this.obtenerHabilidades(),
      conocimientos: this.obtenerConocimientos()
    }
    console.log(parametros);
     this.modelosService.registrarModelo(parametros).subscribe({
        next: (response: any) => {
          if(response.status === 200){
            this.messageService.add({severity:'success', summary: 'Exito', detail: 'Modelo registrado correctamente'});
            this.formulario.reset();
            this.habilidades = [];
            this.conocimientos = [];
            this.uploadedFiles = [];
            this.cerrarDialogoEmit.emit();
          }
          
        },
        error: (error: any) => {
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Ocurrio un error al registrar el modelo'});
        }
     })
  }


  obtenerConocimientos(){
    const conocimientos: any[] = []
    this.conocimientos.map(conocimiento => {
       const array = {
          nombre: conocimiento.nombre,
          descripcion: conocimiento.descripcion
       }
        conocimientos.push(array);
    })
    return conocimientos;
  }

  obtenerHabilidades(){
    let habilidades: any[] = []
    this.habilidades.map(habilidad => {
       const array = {
          nombre: habilidad.nombre,
          descripcion: habilidad.descripcion
       }
        habilidades.push(array);
    })

    return habilidades;
  }
  
}
