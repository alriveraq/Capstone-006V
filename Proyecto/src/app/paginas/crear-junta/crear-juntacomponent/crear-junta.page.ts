import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm , Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { Junta } from '../interface/crear-junta';



@Component({
  selector: 'app-crear-junta',
  templateUrl: './crear-junta.page.html',
  styleUrls: ['./crear-junta.page.scss'],
})
export class CrearJuntaPage implements OnInit {
  errormessage: string = '';
  juntaform!: FormGroup;

  junta: Junta = {
    id_junta: 0,
    nombre_barrio: '',
    direccion : '',
    fecha_fundacion : new Date(),
    j_nombre_presidente : '',
    j_telefono_contacto : 0,
    j_email_contacto : 0,
    fecha_creacion : new Date(),


  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    this.juntaform = this.formBuilder.group({
      'id_junta': ['', [Validators.required]],
      'nombre_barrio': ['', [Validators.required]],
      'direccion': ['', [Validators.required]],
      'fecha_fundacion': ['', [Validators.required]],
      'j_nombre_presidente': ['', [Validators.required]],
      'j_telefono_contacto': ['', [Validators.required]],
      'j_email_contacto': ['', [Validators.required, Validators.email]],
      'fecha_creacion': ['', [Validators.required]],
    });
  }
    async cJunta() {
      if (this.juntaform.invalid) {
        if (this.juntaform.get('nombre_barrio')?.hasError('required')) {
          this.errormessage = 'El nombre es obligatorio.';
        } else if (this.juntaform.get('direccion')?.hasError('required')) {
          this.errormessage = 'La direccion es obligatoria.';
        } else if (this.juntaform.get('fecha_fundacion')?.hasError('required')) {
          this.errormessage = 'La fecha es obligatoria.';
        } else if (this.juntaform.get('j_nombre_presidente')?.hasError('required')) {
          this.errormessage = 'El nombre es obligatorio.';
        } else if (this.juntaform.get('j_telefono_contacto')?.hasError('required')) {
          this.errormessage = 'El telefono es Obligatorio.';
        } else if (this.juntaform.get('j_email_contacto')?.hasError('email')) {
          this.errormessage = 'Ingresar email correcto.';
      } else if (this.juntaform.get('fecha_creacion')?.hasError('required')) {
        this.errormessage = 'La fecha es obligatoria.'; 
        return;
      }
      
      const loading = await this.loadingController.create({
        message: 'Junta creada',
      });
      await loading.present();
  
      const juntaData: Junta = this.juntaform.value;
    }
  
  
  
  }

}
