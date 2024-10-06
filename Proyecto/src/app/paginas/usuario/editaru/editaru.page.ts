import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuarioo } from '../interface/usuario';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-editaru',
  templateUrl: './editaru.page.html',
  styleUrls: ['./editaru.page.scss'],
})
export class EditaruPage implements OnInit {
    errormessage: string = '';
    usuariouform!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    this.usuariouform = this.formBuilder.group({
      'rut': ['', [Validators.required]],
      'nombre': ['', [Validators.required]],
      'a_paterno': ['', [Validators.required]],
      'a_materno': ['', [Validators.required]],
      'tipo_casa': ['', [Validators.required]],
      'integrantes': ['', [Validators.required]],
      'adultos_mayores': ['', [Validators.required]],
    });
  }

  async eUsuario(){
    console.log('Formulario válido:', this.usuariouform.valid);
    console.log('Errores en el formulario:', this.usuariouform.errors);
    console.log('Valores del formulario:', this.usuariouform.value);

    if (this.usuariouform.invalid) {
        if (this.usuariouform.get('rut')?.hasError('required')) {
          this.errormessage = 'El Rut es obligatorio.';
        } else if (this.usuariouform.get('nombre')?.hasError('required')) {
          this.errormessage = 'El numbre es obligatorio.';
        } else if (this.usuariouform.get('a_paterno')?.hasError('required')) {
          this.errormessage = 'EL apellido paterno es obligatorio.';
        } else if (this.usuariouform.get('a_materno')?.hasError('required')) {
        this.errormessage = 'EL apellido materno es obligatorio.';
        } else if (this.usuariouform.get('tipo_casa')?.hasError('required')) {
        this.errormessage = 'EL tipo de casa es obligatorio.';
        } else if (this.usuariouform.get('integrantes')?.hasError('required')) {
        this.errormessage = 'La cantidad de integrantes es obligatorio.';
        } else if (this.usuariouform.get('adultos_mayores')?.hasError('required')) {
        this.errormessage = 'La cantidad de adultos mayores es obligatoria.';
        }
        
        return; 
      }
      const loading = await this.loadingController.create({
        message: 'editando usuario....',
      });  
  }

}
