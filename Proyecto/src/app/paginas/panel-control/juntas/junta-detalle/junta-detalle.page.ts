import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaneldecontrolService } from '../../service/paneldecontrol.service';
@Component({
  selector: 'app-junta-detalle',
  templateUrl: './junta-detalle.page.html',
  styleUrls: ['./junta-detalle.page.scss'],
})
export class JuntaDetallePage implements OnInit {
  totalUsuarios: number = 0;
  proximaReunion: any;
  votacionesActivas: any[] = [];
  proyectosActivos: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private PaneldecontrolService: PaneldecontrolService
  ) { }

  ngOnInit() {
    const id_junta = this.route.snapshot.paramMap.get('id_junta');
    if (id_junta) {
      this.loadData(id_junta);
    }
  }

  loadData(id_junta: string): void {
    this.PaneldecontrolService.getTotalUsuariosPorJunta(id_junta).subscribe(
      (data: any) => {
        this.totalUsuarios = data[0][0];
      },
      (error) => console.error('Error al obtener total de usuarios:', error)
    );

    this.PaneldecontrolService.getProximaReunion(id_junta).subscribe(
      (data: any) => {
        this.proximaReunion = {
          id: data[0],
          nombre: data[1],
          ubicacion: data[2],
          fecha: new Date(data[3]),
          idJunta: data[4],
          nombreJunta: data[5]
        };
      },
      (error) => console.error('Error al obtener próxima reunión:', error)
    );

    this.PaneldecontrolService.getVotacionesActivasPorJunta(id_junta).subscribe(
      (data: any) => {
        this.votacionesActivas = data.map((item: any[]) => ({
          idJunta: item[0],
          nombreJunta: item[1],
          totalVotaciones: item[2]
        }));
      },
      (error) => console.error('Error al obtener votaciones activas:', error)
    );

    this.PaneldecontrolService.getProyectosActivosPorJunta(id_junta).subscribe(
      (data: any) => {
        this.proyectosActivos = data.map((item: any[]) => ({
          idJunta: item[0],
          nombreJunta: item[1],
          totalProyectos: item[2]
        }));
      },
      (error) => console.error('Error al obtener proyectos activos:', error)
    );
  }


}
