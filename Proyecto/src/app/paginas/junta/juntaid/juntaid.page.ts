import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JuntaService } from '../service/juntaservice.service';

@Component({
  selector: 'app-juntaid',
  templateUrl: './juntaid.page.html',
  styleUrls: ['./juntaid.page.scss'],
})
export class JuntaidPage implements OnInit {
  public titulo: string = '';
  public usuarios: any[] = [];
  public idPresidente?: number; // Almacenar ID del presidente

  constructor(private api: JuntaService, private router: Router) {}

  ngOnInit() {
    const id_junta = this.router.url.split('/').pop();
    if (!id_junta) {
      console.error('ID de junta no encontrada en la URL');
      return;
    }

    this.api.getInformacionJuntaid(id_junta).subscribe(
      (data) => {
        if (data.informacion.length === 0) {
          console.error('No se encontró información de la junta');
        } else {
          console.log('Información de la junta:', data);
          this.titulo = data.informacion[0][0]; // Nombre de la junta
          this.idPresidente = data.informacion[0][3]; // ID del presidente

          this.usuarios = data.usuarios.map((usuarioArray: any) => ({
            nombre: usuarioArray[0],
            email: usuarioArray[1],
            contacto: usuarioArray[2],
            rol: usuarioArray[3],
            fecha: usuarioArray[4],
          }));
        }
      },
      (error) => {
        console.error('Error al obtener la información de la junta:', error);
      }
    );

  }

  solicitarUnionJunta() {
    const id_usuario = localStorage.getItem('id_usuario');
    if (!id_usuario) {
      console.error('ID de usuario no encontrada en localStorage');
      return;
    }

    if (!this.idPresidente) {
      console.error('ID del presidente no encontrada');
      return;
    }

    this.api.solicitarUnionJunta(
      Number(id_usuario),
      this.idPresidente,
      Number(this.router.url.split('/').pop()),
      'Pendiente',
      //dejamos la fecha de respuesta en null
      new Date()
    ).subscribe(
      (data) => {
        console.log('Respuesta de la API:', data);
        alert('Solicitud enviada correctamente');
      },
      (error) => {
        console.error('Error al enviar la solicitud:', error);
        alert('Usted ya se encuentra en una junta');
    });
  }
  
}
