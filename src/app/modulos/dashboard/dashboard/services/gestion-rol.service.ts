import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GestionRolService {
  
  url: string = 'http://localhost/projects/erost_api/api/';

  constructor(private http: HttpClient) { }


  consultarRoles(): Observable<any>{
    return this.http.get<Observable<any>>(this.url + 'consultar-roles');
  }

}
