import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginserviceService } from '../login/loginservice/loginservice.service';
import { JuntaService } from '../junta/service/juntaservice.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  slideIndex = 0;
  public searchTerm: string = '';
  public filteredjuntas: any[] = [];
  private searchSubject: Subject<string> = new Subject<string>();
  public juntas: any[] = [];
  
  public publicaciones: any[] = [];
  
  

    constructor(private login: LoginserviceService, 
                private router: Router,
                private api: JuntaService) { }


  logeado(): boolean { 
    return this.login.logeado();
  }

  navegarAInfoJunta() {
    const id_usuario = localStorage.getItem('id_usuario'); // Obtener la ID del usuario del localStorage
    if (id_usuario) {
      this.router.navigate(['/juntap', id_usuario]); // Navegar a la ruta con la ID
    } else {
      console.error('No se encontró la ID del usuario en localStorage');
    }
  }

  navegarAInfoUsuario() {
    const id_usuario = localStorage.getItem('id_usuario'); // Obtener la ID del usuario del localStorage
    if (id_usuario) {
      this.router.navigate(['/usuariop', id_usuario]); // Navegar a la ruta con la ID
    } else {
      console.error('No se encontró la ID del usuario en localStorage');
    }
  }


  ngOnInit() {
    this.obtenerJuntas();
    this.obtenerPublicaciones();
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
}


















