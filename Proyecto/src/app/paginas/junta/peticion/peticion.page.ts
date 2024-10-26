import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-peticion',
  templateUrl: './peticion.page.html',
  styleUrls: ['./peticion.page.scss'],
})
export class PeticionPage implements OnInit {
  tipoSolicitud: string = '';
  descripcionSolicitud: string = '';
  fechaHoraSolicitud: string = ''; 

  constructor() { }

  ngOnInit() { }

  enviarSolicitud() {
    const solicitudData = {
      tipoSolicitud: this.tipoSolicitud,
      descripcion: this.descripcionSolicitud,
      fechaHora: this.fechaHoraSolicitud,
    };

    console.log('Solicitud:', solicitudData);

  }
}