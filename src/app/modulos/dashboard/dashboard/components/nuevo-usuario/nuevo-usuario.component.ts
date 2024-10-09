import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadEvent, FileUploadModule } from 'primeng/fileupload';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-nuevo-usuario',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, InputTextModule,DropdownModule, FileUploadModule],
  providers: [MessageService],
  templateUrl: './nuevo-usuario.component.html',
  styleUrl: './nuevo-usuario.component.scss'
})
export class NuevoUsuarioComponent implements OnInit {


  formulario: FormGroup = new FormGroup({});

  listaCargo: any[] = [
    {label: 'Administrador', value: 'Administrador'},
    {label: 'Monitor', value: 'Monitor'},
  ];
  

  constructor(private fb:FormBuilder, private usuariosService:UsuariosService, private messageService: MessageService) { }

  @Output() registrarUsuariosEmit: EventEmitter<any> = new EventEmitter<any>();


  ngOnInit(): void {
    this.inicializarFormulario();
  }

    _listaRoles: any[] = [];  
  @Input() set listaRoles(value: any){
    this._listaRoles = value;
  }


  inicializarFormulario(){
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required] ],
      email: ['', [Validators.required]],
      edad: ['', [Validators.required]],
      cargo: ['', [Validators.required]],
      foto: ['', [Validators.required]],
      rol: ['', [Validators.required]],
    });
  }

  registrarUsuario(){
    this.registrarUsuariosEmit.emit(this.crearParametros());    
  }

  onUpload(event: any) {
      const file = event.files[0];
      if (file) {
        this.convertFileToBase64(file);
      }
    
  }

  convertFileToBase64(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      const base64Data = base64String.split(',')[1]; // Extrae solo la parte base64
      this.formulario.get('foto')?.setValue(base64Data);
    };
    reader.readAsDataURL(file);
  }

  crearParametros(){
    const parametros = {
      nombre: this.formulario.get('nombre')?.value,
      email: this.formulario.get('email')?.value,
      edad: this.formulario.get('edad')?.value,
      cargo: this.formulario.get('cargo')?.value.value,
      foto: this.formulario.get('foto')?.value,
      rol: this.formulario.get('rol')?.value.idts_rol,
      contrasena: 'erost123456'
    }
    return parametros;
  }

  get listaRoles(){
    return this._listaRoles;
  }


}
