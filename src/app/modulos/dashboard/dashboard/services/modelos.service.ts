import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModelosService {

    
  url: string = 'http://localhost/projects/erost_api/api/';

  constructor(private http: HttpClient) { }


  registrarModelo(datos: any): Observable<any>{
    return this.http.post<Observable<any>>(this.url + 'registro-modelo', datos);
  }

  consultarModelos(): Observable<any>{
    return this.http.get<Observable<any>>(this.url + 'consultar-modelos');
  }

  actualizarModelo(datos: any): Observable<any>{  
    return this.http.put<Observable<any>>(this.url + 'actualizar-informacion', datos);
  }

  guardarActitud(datos: any): Observable<any>{
    return this.http.put<Observable<any>>(this.url + 'guardar-actitudes', datos);
  }

  guardarProfesinalismo(datos: any): Observable<any>{
    return this.http.put<Observable<any>>(this.url + 'guardar-actitudes', datos);
  }

  guardarAdaptabilidad(datos: any): Observable<any>{
    return this.http.put<Observable<any>>(this.url + 'guardar-actitudes', datos);
  }

  acualizarFoto(datos: any): Observable<any>{ 
    return this.http.put<Observable<any>>(this.url + 'actualizar-foto-modelo', datos);
  }

  guardarConocimiento(datos: any): Observable<any>{
    return this.http.post<Observable<any>>(this.url + 'nuevo-conocimiento', datos);
  }

  guardarHabilidad(datos: any): Observable<any>{
    return this.http.post<Observable<any>>(this.url + 'nueva-habilidad', datos);
  }

  eliminarConocimiento(data: any): Observable<any>{
    return this.http.post<Observable<any>>(this.url + `eliminar-conocimiento`, data);
  }

  eliminarHabilidad(data: any): Observable<any>{
    return this.http.post<Observable<any>>(this.url + `eliminar-habilidad`, data);
  }


  editarConocimiento(data: any): Observable<any>{
    return this.http.post<Observable<any>>(this.url + `editar-conocimiento`, data);
  }

  editarHabilidad(data: any): Observable<any>{
    return this.http.post<Observable<any>>(this.url + `editar-habilidad`, data);
  }


}
