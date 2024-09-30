import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CrearService {

  private apiUrl = 'http://localhost:3000/api/creacionjunta';

  constructor(private http: HttpClient) { }

  creacionjunta(nombre_barrio: string, direccion: string, fecha_fundacion: Date, id_presidente: number): Observable<any> {
      const date = new Date(fecha_fundacion);
      console.log('id_presidente:', id_presidente);
      console.log('Enviando a la API:', { u_nombre_barrio: nombre_barrio, u_direccion: direccion, u_fecha_fundacion: date, id_presidente: id_presidente });

    return this.http.post<any>(this.apiUrl, { u_nombre_barrio: nombre_barrio, u_direccion: direccion, u_fecha_fundacion: date, id_presidente: id_presidente  }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Error desconocido';
    if (error.error instanceof ErrorEvent) {
    } else {
      // Errores del lado del servidor
      errorMessage = `Código: ${error.status}, Mensaje: ${error.error.u_mensaje || 'Error al comunicarse con el servidor'}`;
    }
    return throwError(errorMessage);
}


}
