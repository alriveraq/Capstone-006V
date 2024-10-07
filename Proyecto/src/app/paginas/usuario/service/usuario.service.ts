import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:3000/api/usuario';

  constructor(private http: HttpClient) { }

  getUsuario(id_usuario: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id_usuario}`);
  }
}
