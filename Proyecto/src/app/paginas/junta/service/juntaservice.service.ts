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
    return this.http.get(`${this.baseUrl}/info/junta/${id_usuario}`);
  }

  getInformacionJuntaid(id_junta: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/junta/${id_junta}`);
  }

  getjuntas(): Observable<any> {
    return this.http.get(`${this.baseUrl}/juntas`);
  }

  solicitarUnionJunta(u_id_usuario: number, u_id_presidente_junta: number, u_id_junta: number, u_estado: string, u_fecha_solicitud: Date): Observable<any> {
    console.log('Enviando a la API:', { u_id_usuario, u_id_presidente_junta, u_id_junta, u_estado, u_fecha_solicitud });

    return this.http.post(`${this.baseUrl}/junta/solicitar`, {
        u_id_usuario,
        u_id_presidente_junta,
        u_id_junta,
        u_estado,
        u_fecha_solicitud
    });
  }

  actualizarEstadoSolicitud(id_solicitud_union: number, estado: string) {
    console.log('Enviando a la API:', { id_solicitud_union, estado });
    return this.http.put(`${this.baseUrl}/junta/solicitar/${id_solicitud_union}`, { estado });
}
}