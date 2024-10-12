import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../service/usuario.service';
import { Usuario } from '../../register/Interface/usuario';
import { LoginserviceService } from '../../login/loginservice/loginservice.service';

@Component({
  selector: 'app-usuariop',
  templateUrl: './usuariop.page.html',
  styleUrls: ['./usuariop.page.scss'],
})
export class UsuariopPage implements OnInit {
  usuario: Usuario;

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private loginservice: LoginserviceService,
    private router: Router
  ) {
    this.usuario = new Usuario({}); // Inicializar el objeto
  }

  ngOnInit() {
    const id_usuario = this.route.snapshot.paramMap.get('id_usuario');
  
    if (id_usuario) {
      this.usuarioService.getUsuario(id_usuario).subscribe(
        (data) => { 
          console.log('Información completa del usuario:', data);
          if (Array.isArray(data)) {
            const usuarioData = data[0];
            
            this.usuario = new Usuario({
              nombre: usuarioData[0],
              a_paterno: usuarioData[1],
              email: usuarioData[3], 
              tipo_casa: usuarioData[4],
              rut: usuarioData[5],
              adultos_mayores: usuarioData[6],
              integrantes: usuarioData[7],
              fecha_creacion: usuarioData[8],

            });

          } else {
            console.error('El formato de la respuesta no es un array o está vacío.');
          }
  
        },
        (error) => {
          console.error('Error al obtener la información del usuario:', error);
        }
      );
    } else {
      console.error('ID de usuario no encontrado en la URL');
    }
  }
  logout() {
    this.loginservice.logout();
    this.router.navigate(['/login']);
  }	  
}
