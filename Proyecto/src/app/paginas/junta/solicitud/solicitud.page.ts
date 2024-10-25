import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JuntaService } from '../service/juntaservice.service';
import { observable, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators'

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.page.html',
  styleUrls: ['./solicitud.page.scss'],
})
export class SolicitudPage implements OnInit {
  public solicitudes: any[] = [];
  constructor(private api: JuntaService, private router: Router) {}

  ngOnInit() {

    const id_usuario = localStorage.getItem('id_usuario');
    if (!id_usuario) {
      console.error('ID de usuario no encontrado en localStorage');
      return;
    }

    this.api.getInformacionJunta(id_usuario).subscribe(
      (data) => {
        if (data.informacion.length === 0) {
        } else {
          console.log('Información de la junta:', data);

          this.solicitudes = data.solicitudes.map((solicitudArray: any) => ({
            nombre: solicitudArray[0],
            estado: solicitudArray[1],
            id: solicitudArray[2],
          }));
          //tramoes las id de las solicitudes
          console.log('Solicitudes:', this.solicitudes);
        }
      },
      (error) => {
        console.error('Error al obtener la información de la junta:', error);
        this.router.navigate(['/crear-junta']);
      }
    );
  }

  //aceptamos la solicitud
  aceptarSolicitud(idSolicitud: number) {
    this.api.actualizarEstadoSolicitud(idSolicitud, 'Aprobado').subscribe(
      (data) => {
        console.log('Solicitud aceptada:', data);
        this.ngOnInit();
      },
      (error) => {
        console.error('Error al aceptar la solicitud:', error);
      }
    );
  }

  //rechazamos la solicitud
  rechazarSolicitud(idSolicitud: number) {
    this.api.actualizarEstadoSolicitud(idSolicitud, 'Rechazado').subscribe(
      (data) => {
        console.log('Solicitud rechazada:', data);
        this.ngOnInit();
      },
      (error) => {
        console.error('Error al rechazar la solicitud:', error);
      }
    );
  }

  

}
