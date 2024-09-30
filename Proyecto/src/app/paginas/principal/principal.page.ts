import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginserviceService } from '../login/loginservice/loginservice.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  constructor(private login: LoginserviceService, private router: Router) { }

  logeado(): boolean { 
    return this.login.logeado();
  }

  navegarAInfoJunta() {
    const id_usuario = localStorage.getItem('id_usuario'); // Obtener la ID del usuario del localStorage
    if (id_usuario) {
      this.router.navigate(['/juntap', id_usuario]); // Navegar a la ruta con la ID
    } else {
      // Manejo si no hay id_usuario
      console.error('No se encontró la ID del usuario en localStorage');
    }
  }

  ngOnInit() {
  }

}
