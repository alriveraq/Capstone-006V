import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginserviceService } from '../login/loginservice/loginservice.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  
  constructor(private servicio: LoginserviceService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const logeado = this.servicio.logeado();
    const id_usuario = route.paramMap.get('id_usuario'); // Obtener el ID de usuario de la URL

    if (!logeado) {
      this.router.navigate(['/login']);
      return false;
    }

    const currentUserId = this.servicio.getuserid(); // Asumiendo que tienes un método para obtener el ID del usuario autenticado

    // Verifica si el ID en la URL es igual al ID del usuario autenticado
    if (id_usuario !== currentUserId) {
      this.router.navigate(['/pagina-de-error']); // Redirige a una página de error o de acceso denegado
      return false;
    }

    return true;
  }
}
