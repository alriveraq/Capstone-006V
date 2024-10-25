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
  
  noticias = [
    {
      imagenUrl: 'https://civantoscomunidades.com/wp-content/uploads/2020/06/dudas_sobre_el_presupueto_reunion_digitalmanetenimientos-800x600.png',
      titulo: 'Noticia 1',
      descripcion: 'Descripción de la noticia 1',
    },
    {
      imagenUrl: 'https://aguacatec.es/wp-content/uploads/2023/10/e5a978b8-6772-4c85-a50e-15581af7d483.png',
      titulo: 'Noticia 2',
      descripcion: 'Descripción de la noticia 2',
    },
    {
      imagenUrl: 'https://blog.jumboprinters.com/wp-content/uploads/2021/09/consejos-imagenes.jpg',
      titulo: 'Noticia 2',
      descripcion: 'Descripción de la noticia 2',
    },
 
  ];
  
  

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
    this.api.getjuntas().subscribe(
      (data) => {
        if (data.length === 0) {
          console.log('No hay juntas disponibles.');
        } else {
          console.log('Información de las juntas:', data);

          this.juntas = data.map((juntaArray: any) => ({
            nombre: juntaArray[1],
          }));

          this.filteredjuntas = [...this.juntas]; // Inicializa la lista filtrada con todas las juntas
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


  

}


















