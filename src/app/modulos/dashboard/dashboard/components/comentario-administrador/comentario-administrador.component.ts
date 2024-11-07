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

  constructor(private fb:FormBuilder, private messageService: MessageService, private router:Router) { } 

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

 
  get idModelo(){
    return this._idModelo as number ;
  } 

}
