import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MonitorService } from '../../services/monitor.service';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comentario-administrador',
  standalone: true,
  imports: [DropdownModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './comentario-administrador.component.html',
  styleUrl: './comentario-administrador.component.scss'
})
export class ComentarioAdministradorComponent {
  
  formulario: FormGroup = new FormGroup({});
  informacion: any = {};  
  _idModelo?: number;  
   tipoComentario: any[] | undefined;

  @Input() set idModelo(value: number){
    this._idModelo = value;
  }

  constructor(private fb:FormBuilder, private monitorService:MonitorService,private messageService: MessageService, private router:Router) { } 

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
      nombre: [''],
      tipo: ['']
    })
  }

  guardarComentario() {
    let parametros = {
      idts_modelo: this.idModelo,
      nombre: this.formulario.controls['nombre'].value, 
      descripcion: this.formulario.value.comentario,
      tipo_comentario: this.formulario.value.tipo.value
    }
    console.log(parametros);
    this.monitorService.guardarComentarioAdministrador(parametros).subscribe({
      next: (data) => {
         console.log(data);
         if(data.status == 200){
            this.messageService.add({severity:'success', summary:'Exito', detail:'Comentario guardado correctamente'});
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

  get idModelo(){
    return this._idModelo as number ;
  } 

}
