import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputTextModule, ButtonModule, ReactiveFormsModule, ToastModule],
  providers: [LoginService, MessageService,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements  OnInit {

 
   formulario:FormGroup = new FormGroup({});
   constructor(private fb:FormBuilder, private loginService:LoginService, private messageService: MessageService, private router:Router) { }

   ngOnInit(): void {
     this.inicializarFormulario();
  }

  inicializarFormulario(){
    this.formulario = this.fb.group({
      email: ['',[Validators.required]],
      contrasena: ['', [Validators.required]]
    })
  }

  login(){
    const parametros = {
      email: this.formulario.get('email')?.value,
      contrasena: this.formulario.get('contrasena')?.value
    }
    this.loginService.login(parametros).subscribe({
      next: (data) => {
          if(data.status == 200){
            console.log(data);
            this.messageService.add({
              severity: 'success',
              summary: 'Exito',
              detail: data.message
            })
            localStorage.setItem('token', data.data.email);
            localStorage.setItem('usuaario', data.data.idts_usuario);
            localStorage.setItem('rol', data.data.ts_rol_idts_rol);
            this.router.navigate(['/dashboard']);
          }
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error.message
        })

      }
    })

  }

}
