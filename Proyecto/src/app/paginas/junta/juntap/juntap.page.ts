import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JuntaService } from '../service/juntaservice.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-juntap',
  templateUrl: './juntap.page.html',
  styleUrls: ['./juntap.page.scss'],
})
export class JuntapPage implements OnInit {
  public titulo: string = '';
  public usuarios: any[] = [];
  public solicitudes: any[] = [];
  public searchTerm: string = '';
  public filteredUsuarios: any[] = [];
  private searchSubject: Subject<string> = new Subject<string>();

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
          this.titulo = data.informacion[0][0];

          this.usuarios = data.usuarios.map((usuarioArray: any) => ({
            nombre: usuarioArray[0],
            email: usuarioArray[1],
            contacto: usuarioArray[2],
            rol: usuarioArray[3],
            fecha: usuarioArray[4],
          }));

          this.solicitudes = data.solicitudes.map((solicitudArray: any) => ({
            nombre: solicitudArray[0],
            estado: solicitudArray[1],
          }));

          this.filteredUsuarios = this.usuarios;
          this.setupSearch();
        }
      },
      (error) => {
        console.error('Error al obtener la información de la junta:', error);
        this.router.navigate(['/crear-junta']);
      }
    );
  }

  setupSearch() {
    this.searchSubject
      .pipe(debounceTime(300))
      .subscribe((term) => {
        this.filterUsuarios(term);
      });
  }

  debounceFilter() {
    this.searchSubject.next(this.searchTerm);
  }

  filterUsuarios(term: string) {
    term = term.toLowerCase();
    this.filteredUsuarios = this.usuarios.filter((usuario) => 
      usuario.nombre.toLowerCase().includes(term) || 
      usuario.email.toLowerCase().includes(term)
    );
  }
}
