import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { UsuariosService } from '../../services/usuarios.service';
import { DialogModule } from 'primeng/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ModelosService } from '../../services/modelos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, ButtonModule, AvatarModule, BadgeModule, DialogModule, InputTextModule, ToastModule],
  providers: [UsuariosService, ModelosService],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss',
})
export class PerfilComponent implements OnInit {
  
  formulario: FormGroup = new FormGroup({});
  listaModelos: any;

  constructor(private usuariosService: UsuariosService, private fb:FormBuilder, private messageService: MessageService, private router:Router ) {}
  informacionUsuario: any = {};
  cambiarContraseña: boolean = false; 
  visible: boolean = false; 
  notificaciones: any[] = [];
  

  ngOnInit(): void {
    const id = localStorage.getItem('usuaario');
    this.usuariosService.consultarUsuarioPorId(Number(id)).subscribe({
      next: (response) => {
        if (response.status == 200) {
          console.log(response.data);
          this.informacionUsuario = response.data[0];
          if(this.informacionUsuario.temporar == 1){
            this.cambiarContraseña = true;
            this.visible = true;
          }else {
            this.cambiarContraseña = false;
            this.visible = false;
          }
          localStorage.setItem(
            'usuario',
            JSON.stringify(this.informacionUsuario)
          );
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
    this.inicializarFormulario();
    this.consultarNoticicaciones();
  }


  inicializarFormulario(){
    this.formulario = this.fb.group({
      paswordactual: [''],
      password: [''],
      password2: ['']
    })
  }


  cambiarContrasena(){
    let idts_usuario =  localStorage.getItem('usuaario');
    if(!idts_usuario){
      return;
    }

    if(this.formulario.get('password')?.value == '' || this.formulario.get('password2')?.value == '' || this.formulario.get('password')?.value == ''){
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Todos los campos son obligatorios'});
      return;
    } else{
      if(this.formulario.get('password')?.value != this.formulario.get('password2')?.value){   
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Las contraseñas no coinciden'});
        return;
      }
  
      const parametros = {
        idts_usuario: idts_usuario,
        contrasena_actual: this.formulario.get('paswordactual')?.value,
        contrasena_nueva: this.formulario.get('password2')?.value,
      }

      this.usuariosService.cambiarContrasena(parametros).subscribe({
        next: (response) => {
          if(response.status == 200){
            this.messageService.add({severity:'success', summary: 'Exito', detail: 'Contraseña actualizada correctamente'});
            this.visible = false;
          }
        },
        error: (error) => {
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al cambiar la contraseña'});
        }
      });

    }
  }

  consultarNoticicaciones(){
    this.usuariosService.consultarNotificaciones().subscribe({
      next: (response) => {
         if(response.status == 200){
           this.notificaciones = response.data;
         }
      }
    })
  }

  irModelo(){
    this.router.navigate(['/dashboard/modelos']);
  }

}
