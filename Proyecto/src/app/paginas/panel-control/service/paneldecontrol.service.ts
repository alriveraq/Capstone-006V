import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaneldecontrolService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  //pagina principal de panel de control

  gettotaljuntas(): Observable<any> {
    return this.http.get(`${this.baseUrl}/obtenereltotaljuntas`);
  }

  gettotalusuarios(): Observable<any> {
    return this.http.get(`${this.baseUrl}/totaldeusuarios`);
  }

  gettotalreuniones30dias(): Observable<any> {
    return this.http.get(`${this.baseUrl}/totaldereunionesen30dias`);
  }

  gettotaldevotaciones(): Observable<any> {
    return this.http.get(`${this.baseUrl}/totaldevoaciones`);
  }

  gettotaldeproyectos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/totaldeproyectos`);
  }

  // Pagina de juntas

  getjuntas(): Observable<any> {
    return this.http.get(`${this.baseUrl}/verinformaciondejunta`);
  }

  getJuntaById(id_junta: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/totaldeusuariosporjunta/${id_junta}`);
  }

  getTotalUsuariosPorJunta(id_junta: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/totaldeusuariosporjunta/${id_junta}`);
  }
  
  getProximaReunion(id_junta: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/proximareunion/${id_junta}`);
  }
  
  getVotacionesActivasPorJunta(id_junta: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/votacionesactivasporjunta/${id_junta}`);
  }
  
  getProyectosActivosPorJunta(id_junta: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/proyectosactivosporjunta/${id_junta}`);
  }
}
