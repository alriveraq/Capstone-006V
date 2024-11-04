import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

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

  getPublicaciones(id_usuario: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/junta/publicaciones/${id_usuario}`);
}


  creacionPublicacion(id_junta: number, id_usuario: number, titulo: string, contenido: string, imagen: string,  enviarCorreo: boolean): Observable<any> {
    console.log('Enviando a la API:', { u_id_junta: id_junta, u_id_usuario: id_usuario, u_titulo: titulo, u_contenido: contenido, u_imagen: imagen, enviarCorreo: enviarCorreo });
    return this.http.post(`${this.baseUrl}/junta/crearpublicacion`, { u_id_junta: id_junta, u_id_usuario: id_usuario, u_titulo: titulo, u_contenido: contenido, u_imagen: imagen, enviarCorreo: enviarCorreo  });
  }

  crearReunion(id_junta: number, id_usuario: number, u_tema: string, u_resumen:string, u_fecha_reunion:Date,  enviarCorreo: boolean): Observable<any> {
    console.log('Enviando a la API:', { u_id_junta: id_junta, u_id_usuario: id_usuario, u_tema: u_tema, u_resumen: u_resumen, u_fecha_reunion: u_fecha_reunion,  enviarCorreo: enviarCorreo });
    return this.http.post(`${this.baseUrl}/reunion/crearreunion`, { u_id_junta: id_junta, u_id_usuario: id_usuario, u_tema: u_tema, u_resumen: u_resumen, u_fecha_reunion: u_fecha_reunion, enviarCorreo: enviarCorreo });
  }


  registrarasistencia(id_usuario: number, id_reunion: number, u_asistio: number ): Observable<any> {
    console.log('Enviando a la API:', { u_id_usuario: id_usuario, u_id_reunion: id_reunion, u_asistio: u_asistio });
    return this.http.post(`${this.baseUrl}/reunion/registrarasistencia`, {u_id_usuario: id_usuario, u_id_reunion: id_reunion, u_asistio: u_asistio });
  }

  getReuniones(id_usuario: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/reunion/reuniones/${id_usuario}`);
  }

  crearVotacion(id_junta: number, id_usuario: number, tema: string, fecha_inicio:Date, fecha_fin:Date,  enviarCorreo: boolean): Observable<any> {
    console.log('Enviando a la API:', { u_v_id_junta: id_junta, u_v_id_usuario: id_usuario, u_v_tema: tema,  u_v_fecha_inicio: fecha_inicio, u_v_fecha_fin: fecha_fin,  enviarCorreo: enviarCorreo });
    return this.http.post(`${this.baseUrl}/votaciones/crearvotacion`, {u_v_id_junta: id_junta, u_v_id_usuario: id_usuario, u_v_tema: tema,  u_v_fecha_inicio: fecha_inicio, u_v_fecha_fin: fecha_fin,  enviarCorreo: enviarCorreo });
  }

  getVotaciones(id_usuario: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/votaciones/obtenervotaciones/${id_usuario}`);
  }  
  
  registrarvotos(id_usuario: number, id_votacion: number, u_voto: number ): Observable<any> {
    console.log('Enviando a la API:', { u_id_usuario: id_usuario, u_id_votacion: id_votacion, u_voto_tipo: u_voto });
    return this.http.post(`${this.baseUrl}/votaciones/registrarvoto`, {u_id_usuario: id_usuario, u_id_votacion: id_votacion, u_voto_tipo: u_voto });
  }

}