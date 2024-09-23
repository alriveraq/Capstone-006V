import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterserviceService {

  private apiUrl = 'http://localhost:3000/api/register';

  constructor(private http: HttpClient) { }

  register(rut: string, nombre: string, a_paterno: string,

    a_materno: string, tipo_casa: string, integrantes: number, adultos_mayores: number, email: string, contrasena: string,): Observable<any> {

     console.log('Enviando a la API:', { u_rut: rut, u_nombre: nombre, u_a_paterno: a_paterno, u_a_materno: a_materno, u_email: email, u_contrasena: contrasena, u_tipo_casa: tipo_casa, u_integrantes: integrantes, u_adultos_mayores: adultos_mayores });

     return this.http.post<any>(this.apiUrl, { u_rut: rut, u_nombre: nombre, u_a_paterno: a_paterno, u_a_materno: a_materno, u_email: email, u_contrasena: contrasena, u_tipo_casa: tipo_casa, u_integrantes: integrantes, u_adultos_mayores: adultos_mayores }).pipe(

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
