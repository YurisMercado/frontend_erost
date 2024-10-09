import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonitorService {

  url: string = 'http://localhost/projects/erost_api/api/';

  constructor(private http: HttpClient) { }


  guardarComentarioMonitor(data: any):Observable<any>{
    return this.http.post<Observable<any>>(this.url + 'comentario-monitor', data);
  }

 
}
