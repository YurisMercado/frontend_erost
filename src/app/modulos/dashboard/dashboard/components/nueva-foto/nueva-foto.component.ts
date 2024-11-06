import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-nueva-foto',
  standalone: true,
  imports: [ FileUploadModule, ReactiveFormsModule, ButtonModule],
  templateUrl: './nueva-foto.component.html',
  styleUrl: './nueva-foto.component.scss'
})
export class NuevaFotoComponent implements OnInit {
  formulario: FormGroup = new FormGroup({});
  uploadedFiles: {  base64: string }[] = [];

  _idts_empleado: any; 
  @Input() set idts_empleado(value: any){
      this._idts_empleado = value;
  }

  @Output() nuevaFoto = new EventEmitter<any>();
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.inicializarFormulario();
  }

  inicializarFormulario() {
    this.formulario = this.fb.group({
      fotos: this.fb.array([], [Validators.required]),
    });
  }

  onUpload(event: any) {
    const files = event.files;
    for (let file of files) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const base64 = e.target.result;
        this.uploadedFiles.push({
          base64: base64
        });
        this.addFotoToForm(base64); 
      };
      reader.readAsDataURL(file);
    }
  }

  addFotoToForm(base64: string) {
    const fotosFormArray = this.formulario.get('fotos') as FormArray;
    fotosFormArray.push(this.fb.control(base64));
  }

  guardarFoto(){
    let parametros = {
      idts_empleado: this._idts_empleado,
      fotos:this.formulario.get('fotos')?.value,
 
    }

    this.nuevaFoto.emit(parametros);
    console.log(parametros);
  }
}
