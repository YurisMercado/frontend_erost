import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  url: string = 'http://localhost/projects/erost_api/api/';

  constructor(private http: HttpClient) { }


  consultarUsuarios(){
    return this.http.get(this.url + 'consultar-usuarios');
  }

  registrarUsuario(parametros: any){
    return this.http.post(this.url + 'registro', parametros);
  }

  consultarUsuarioPorId(id: number):Observable<any>  {
    return this.http.get<Observable<any>>(this.url + `usuario-por-id?idUsuario=` + id);
  }

  cambiarContrasena(parametros: any):Observable<any>{
    return this.http.put<Observable<any>>(this.url + 'cambiar-contrasena', parametros);
  }

  consultarNotificaciones():Observable<any>{
    return this.http.get<Observable<any>>(this.url + 'consultar-notificaciones');
  }

  marcarNotificacionLeida(parametros: any):Observable<any>{ 
    return this.http.put<Observable<any>>(this.url + 'notificacion-leida', parametros);
  }

  inactivarUsuario(parametros: any):Observable<any>{
    return this.http.put<Observable<any>>(this.url + 'inactivar-usuario', parametros);
  }

}
