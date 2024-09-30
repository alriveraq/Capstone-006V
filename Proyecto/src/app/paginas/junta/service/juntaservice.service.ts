import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JuntaService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getInformacionJunta(id_usuario: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/junta/usuario/${id_usuario}`);
  }
}