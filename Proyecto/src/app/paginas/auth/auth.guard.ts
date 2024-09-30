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

    if (!logeado) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
