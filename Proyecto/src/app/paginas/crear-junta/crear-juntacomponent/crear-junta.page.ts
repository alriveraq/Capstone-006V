import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { Junta } from '../interface/crear-junta';
import { CrearService } from '../service/crear.service';

@Component({
  selector: 'app-crear-junta',
  templateUrl: './crear-junta.page.html',
  styleUrls: ['./crear-junta.page.scss'],
})
export class CrearJuntaPage implements OnInit {
  errormessage: string = '';
  juntaform!: FormGroup;

  constructor(
    private api: CrearService,
    private formBuilder: FormBuilder,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    this.juntaform = this.formBuilder.group({
      'nombre_barrio': ['', [Validators.required]],
      'direccion': ['', [Validators.required]],
      'fecha_fundacion': ['', [Validators.required]],
    });
  }

  async cJunta() {
    console.log('Formulario válido:', this.juntaform.valid);
    console.log('Errores en el formulario:', this.juntaform.errors);
    console.log('Valores del formulario:', this.juntaform.value);
    
    if (this.juntaform.invalid) {
      // Solo verifica los campos definidos en el formulario
      if (this.juntaform.get('nombre_barrio')?.hasError('required')) {
        this.errormessage = 'El nombre es obligatorio.';
      } else if (this.juntaform.get('direccion')?.hasError('required')) {
        this.errormessage = 'La dirección es obligatoria.';
      } else if (this.juntaform.get('fecha_fundacion')?.hasError('required')) {
        this.errormessage = 'La fecha es obligatoria.';
      }
      return; // Asegúrate de salir del método si hay errores
    }
  
    const loading = await this.loadingController.create({
      message: 'Creando junta...',
    });
    await loading.present();
  
    const juntaData: Junta = { 
      ...this.juntaform.value,
      id_presidente: localStorage.getItem('id_usuario'), // Añade la ID del presidente
    };

    console.log('Datos a enviar:', juntaData);
  
    this.api.creacionjunta(
      juntaData.nombre_barrio, 
      juntaData.direccion,
      juntaData.fecha_fundacion,
      juntaData.id_presidente // Asegúrate de enviar la ID del presidente
    ).subscribe(
      async (response) => {
        await loading.dismiss();
      },
      async (error) => {
        await loading.dismiss();
        this.errormessage = 'Los datos de registro no son correctos.';
        console.error('Error al crear la junta:', error); // Imprimir error para depuración
      }
    );
  }
}
