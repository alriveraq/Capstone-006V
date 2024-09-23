import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginserviceService {
<<<<<<< HEAD
  private apiUrl = 'http://localhost:3000/api/login'; 
=======
  private apiUrl = 'http://localhost:3000/api/login'; // Cambia a la URL de tu API
>>>>>>> 3298823d57b92c91fa6d9cddc441fb144c6d6e97

  constructor(private http: HttpClient) {}

  login(email: string, contrasena: string): Observable<any> {
<<<<<<< HEAD
    console.log('Enviando a la API:', { u_email: email, u_contrasena: contrasena }); 
=======
    console.log('Enviando a la API:', { u_email: email, u_contrasena: contrasena }); // Añade un log para depuración
>>>>>>> 3298823d57b92c91fa6d9cddc441fb144c6d6e97
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
  
<<<<<<< HEAD
}
=======
}

>>>>>>> 3298823d57b92c91fa6d9cddc441fb144c6d6e97
