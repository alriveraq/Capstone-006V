import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginserviceService } from '../login/loginservice/loginservice.service';
import { JuntaService } from '../junta/service/juntaservice.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { register } from 'swiper/element/bundle';
import { AlertController } from '@ionic/angular';

register();

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  selectedSegment: string = 'noticias'; 
  slideIndex = 0;
  public searchTerm: string = '';
  public filteredjuntas: any[] = [];
  private searchSubject: Subject<string> = new Subject<string>();
  public juntas: any[] = [];
  public publicaciones: any[] = [];
  public reuniones: any[] = [];
  public proyectos: any[] = [];
  public votaciones: any[] = [];
  constructor(private login: LoginserviceService, 
              private router: Router,
              private api: JuntaService,
              private alertController: AlertController) { }

  logeado(): boolean { 
    return this.login.logeado();
  }

  navegarAInfoJunta() {
    const id_usuario = localStorage.getItem('id_usuario');
    if (id_usuario) {
      this.router.navigate(['/juntap', id_usuario]);
    } else {
      console.error('No se encontró la ID del usuario en localStorage');
    }
  }

  navegarAInfoUsuario() {
    const id_usuario = localStorage.getItem('id_usuario');
    if (id_usuario) {
      this.router.navigate(['/usuariop', id_usuario]);
    } else {
      console.error('No se encontró la ID del usuario en localStorage');
    }
  }

  ngOnInit() {
    this.obtenerJuntas();
    this.obtenerPublicaciones();
    this.obtenerReuniones();
    this.obtenerVotaciones();
  }

  obtenerJuntas() {
    this.api.getjuntas().subscribe(
      (data) => { 
        if (data.length === 0) {
          console.log('No hay juntas disponibles.');
        } else {
          console.log('Información de las juntas:', data);
          this.juntas = data.map((juntaArray: any) => ({
            nombre: juntaArray[1],
            id_junta: juntaArray[0],
          }));
          this.filteredjuntas = [...this.juntas];
          this.setupSearch();
        }
      },
      (error) => {
        console.error('Error al obtener la información de las juntas:', error);
      }
    );
  }

  setupSearch() {
    this.searchSubject
      .pipe(debounceTime(300))
      .subscribe((term) => {
        this.filterJuntas(term);
      });
  }

  debounceFilter() {
    this.filterJuntas();
  }

  filterJuntas(term: string = this.searchTerm) {
    const searchTerm = term.toLowerCase();
    this.filteredjuntas = this.juntas.filter(junta => 
      junta.nombre.toLowerCase().includes(searchTerm)
    );
  }

  irjunta(id_junta: number) {
    if (id_junta) {
      this.router.navigate(['/juntaid', id_junta]);
      console.log('ID de la junta:', id_junta);
    } else {
      console.error('No se encontró la ID de la junta');
    }
  }

  obtenerPublicaciones() {
    const id_usuario = localStorage.getItem('id_usuario');
    if (id_usuario) {
      this.api.getPublicaciones(id_usuario).subscribe(
        (data) => {
          console.log('Publicaciones:', data);
          this.publicaciones = data;
        },
        (error) => {
          console.error('Error al obtener las publicaciones:', error);
        }
      );
    } else {
      console.error('No se encontró la ID del usuario en localStorage');
    }
  }

  obtenerReuniones() {
    const id_usuario = localStorage.getItem('id_usuario');
    if (id_usuario) {
      this.api.getReuniones(id_usuario).subscribe(
        (data) => {
          console.log('Reuniones:', data);
          this.reuniones = data.map((reunionArray: any) => ({
            tema: reunionArray[0],
            fecha: new Date(reunionArray[1]),
            total_asistentes: reunionArray[2],
            total_no_asistentes: reunionArray[3],
            id_reunion: reunionArray[4],
          }));
        },
        (error) => {
          console.error('Error al obtener las reuniones:', error);
        }
      );
    } else {
      console.error('No se encontró la ID del usuario en localStorage');
    }
  }



  async confirmarAsistencia(id_reunion: number, asistio: boolean) {
    const alert = await this.alertController.create({
      header: asistio ? 'Confirmar Asistencia' : 'Confirmar Ausencia',
      message: `¿Estás seguro de que deseas registrar tu asistencia como ${asistio ? 'Sí' : 'No'}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancelado');
          }
        }, {
          text: 'Confirmar',
          handler: () => {
            this.registrarAsistencia(id_reunion, asistio);
          }
        }
      ]
    });

    await alert.present();
  }

  registrarAsistencia(id_reunion: number, asistio: boolean) {
    const id_usuario = localStorage.getItem('id_usuario');
    if (id_usuario) {
      this.api.registrarasistencia(Number(id_usuario), id_reunion, asistio ? 1 : 0).subscribe(
        (response) => {
          console.log('Asistencia registrada:', response);
          this.obtenerReuniones(); // Actualiza la lista de reuniones
        },
        (error) => {
          console.error('Error al registrar asistencia:', error);
        }
      );
    } else {
      console.error('No se encontró la ID del usuario en localStorage');
    }
  }


  obtenerVotaciones() {
    const id_usuario = localStorage.getItem('id_usuario');
    
    if (id_usuario) {
      this.api.getVotaciones(id_usuario).subscribe(
        (data) => {
          console.log('Votaciones:', data);

          // Validación de formato de datos y mapeo de los datos de votación
          if (Array.isArray(data)) {
            this.votaciones = data.map((votacionArray: any) => ({
              tema: votacionArray[0],
              fecha_inicio: new Date(votacionArray[1]),
              fecha_fin: new Date (votacionArray[2]),
              votos_favor: votacionArray[3],
              votos_contra: votacionArray[4],
              abstenciones: votacionArray[5],
              id_votacion: votacionArray[6]  // Campo adicional si necesitas el ID de votación
            }));
          } else {
            console.error('Formato inesperado de datos para votaciones:', data);
          }
        },
        (error) => {
          console.error('Error al obtener las votaciones:', error);
        }
      );
    } else {
      console.error('No se encontró la ID del usuario en localStorage');
    }
  }

  async confirmarvotacion(id_votacion: number, u_voto: boolean) {
    const alert = await this.alertController.create({
      header: u_voto ? 'Voto Si' : 'Voto no',
      message: `¿Estás seguro de que deseas registrar tu asistencia como ${u_voto ? 'Sí' : 'No'}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancelado');
          }
        }, {
          text: 'Confirmar',
          handler: () => {
            this.registrarvoto(id_votacion, u_voto);
          }
        }
      ]
    });

    await alert.present();
  }

  registrarvoto(id_votacion: number, u_voto: boolean) {
    const id_usuario = localStorage.getItem('id_usuario');
    if (id_usuario) {
      this.api.registrarvotos(Number(id_usuario), id_votacion, u_voto ? 1 : 0).subscribe(
        (response) => {
          console.log('Asistencia registrada:', response);
          this.obtenerReuniones(); // Actualiza la lista de reuniones
        },
        (error) => {
          console.error('Error al registrar asistencia:', error);
        }
      );
    } else {
      console.error('No se encontró la ID del usuario en localStorage');
    }
  }





}
