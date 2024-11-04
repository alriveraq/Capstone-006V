import { Component, OnInit } from '@angular/core';
import { PaneldecontrolService } from './service/paneldecontrol.service';

@Component({
  selector: 'app-panel-control',
  templateUrl: './panel-control.page.html',
  styleUrls: ['./panel-control.page.scss'],
})
export class PanelControlPage implements OnInit {
totalJuntas: number = 0;
totalUsuarios: number = 0;
totalReuniones30Dias: number = 0;
totalVotaciones: number = 0;
totalProyectos: number = 0;

  

  constructor(private paneldecontrolservice: PaneldecontrolService ) { }

  ngOnInit() {
    this.obtenertotales();
  }

  obtenertotales(): void {
    this.paneldecontrolservice.gettotaljuntas().subscribe(
      (data) => {
        console.log('Total Juntas:', data);
        this.totalJuntas = data[0][0]; 
      },
      (error) => console.error('Error al obtener el total de juntas', error)
    );
  
    this.paneldecontrolservice.gettotalusuarios().subscribe(
      (data) => {
        console.log('Total Usuarios:', data);
        this.totalUsuarios = data[0][0];
      },
      (error) => console.error('Error al obtener el total de usuarios', error)
    );
  
    this.paneldecontrolservice.gettotalreuniones30dias().subscribe(
      (data) => {
        console.log('Total Reuniones en 30 días:', data);
        this.totalReuniones30Dias = data[0][0];
      },
      (error) => console.error('Error al obtener el total de reuniones en 30 días', error)
    );
  
    this.paneldecontrolservice.gettotaldevotaciones().subscribe(
      (data) => {
        console.log('Total Votaciones:', data);
        this.totalVotaciones = data[0][0];
      },
      (error) => console.error('Error al obtener el total de votaciones', error)
    );
  
    this.paneldecontrolservice.gettotaldeproyectos().subscribe(
      (data) => {
        console.log('Total Proyectos:', data);
        this.totalProyectos = data[0][0];
      },
      (error) => console.error('Error al obtener el total de proyectos', error)
    );
  }
  

}
