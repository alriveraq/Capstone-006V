import { Component, OnInit } from '@angular/core';
import { PaneldecontrolService } from '../service/paneldecontrol.service';


@Component({
  selector: 'app-juntas',
  templateUrl: './juntas.page.html',
  styleUrls: ['./juntas.page.scss'],
})
export class JuntasPage implements OnInit {
  juntas: any[] = [];

  constructor(private paneldecontrolservice: PaneldecontrolService ) { }


  ngOnInit() {
    this.getJuntas();
  }

  getJuntas(): void {
    this.paneldecontrolservice.getjuntas().subscribe(
      (data: any[]) => {
        this.juntas = data.map(junta => ({
          id: junta[0],
          nombre: junta[1],
          direccion: junta[2],
          fecha: new Date(junta[3]), // Convertir la fecha a objeto Date
          asistentes: junta[10],
          presidente: junta[7]
        }));
      },
      (error) => {
        console.error('Error al obtener las juntas:', error);
      }
    );
  }

}
