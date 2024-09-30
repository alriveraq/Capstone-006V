import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginserviceService {
  private apiUrl = 'http://localhost:3000/api/login'; 

  constructor(private http: HttpClient) {}

  login(email: string, contrasena: string): Observable<any> {
    console.log('Enviando a la API:', { u_email: email, u_contrasena: contrasena }); 
    return this.http.post<any>(this.apiUrl, { u_email: email, u_contrasena: contrasena }).pipe(
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

  logeado(): boolean {
    const token = localStorage.getItem('token');
    return token ? true : false;
  }
  
}
