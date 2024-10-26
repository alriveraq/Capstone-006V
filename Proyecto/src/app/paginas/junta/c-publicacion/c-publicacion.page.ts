import { Component, OnInit } from '@angular/core';

interface PublicacionData {
  tipoEntrada: string;
  recibirCorreo: boolean;
  titulo?: string;
  imagen?: string;
  descripcion?: string;
  tituloReunion?: string;
  fechaHora?: string;
}

@Component({
  selector: 'app-c-publicacion',
  templateUrl: './c-publicacion.page.html',
  styleUrls: ['./c-publicacion.page.scss'],
})
export class CPublicacionPage implements OnInit {
  tipoEntrada: string = '';
  titulo: string = '';
  imagen: string = '';
  descripcion: string = '';
  tituloReunion: string = '';
  fechaHora: string = '';
  recibirCorreo: boolean = false;

  constructor() { }

  ngOnInit() { }

  cambiarFormulario() {
    this.titulo = '';
    this.imagen = '';
    this.descripcion = '';
    this.tituloReunion = '';
    this.fechaHora = '';
    this.recibirCorreo = false; 
  }

  enviarFormulario() {
    const publicacionData: PublicacionData = {
      tipoEntrada: this.tipoEntrada,
      recibirCorreo: this.recibirCorreo,
    };

    if (this.tipoEntrada === 'noticia') {
      publicacionData.titulo = this.titulo;
      publicacionData.imagen = this.imagen;
      publicacionData.descripcion = this.descripcion;
      console.log('Noticia:', publicacionData);
    } else if (this.tipoEntrada === 'reunion') {
      publicacionData.tituloReunion = this.tituloReunion;
      publicacionData.fechaHora = this.fechaHora;
      console.log('Reunión:', publicacionData);
    }
  }
}
