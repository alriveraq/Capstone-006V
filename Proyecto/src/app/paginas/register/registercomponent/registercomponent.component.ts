import { Component, OnInit } from '@angular/core';
import { Usuario } from '../Interface/usuario';
import { FormBuilder, FormGroup, NgForm , Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';


@Component({
  selector: 'app-registercomponent',
  templateUrl: './registercomponent.component.html',
  styleUrls: ['./registercomponent.component.scss'],
})
export class RegistercomponentComponent  implements OnInit {
  errormessage: string = '';
  usuarioform!: FormGroup;

  usuario: Usuario = {
    id_usuario: 0,
    rut: '',
    nombre: '',
    a_paterno: '',
    a_materno: '',
    tipo_casa: '',
    integrantes: 0,
    adultos_mayores: 0,
    email: '',
    contrasena: '',
    id_rol: 0,
    id_junta: 0,
    fecha_creacion: new Date(),

  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    this.usuarioform = this.formBuilder.group({
      'id_usuario': ['', [Validators.required]],
      'rut': ['', [Validators.required]],
      'nombre': ['', [Validators.required]],
      'a_paterno': ['', [Validators.required]],
      'a_materno': ['', [Validators.required]],
      'tipo_casa': ['', [Validators.required]],
      'integrantes': ['', [Validators.required]],
      'adultos_mayores': ['', [Validators.required]],
      'email': ['', [Validators.required, Validators.email]],
      'contrasena': ['', [Validators.required]],
      'id_rol': ['', [Validators.required]],
      'id_junta': ['', [Validators.required]],
      'fecha_creacion': ['', [Validators.required]],
    });


  }

  async register() {
    if (this.usuarioform.invalid) {
      if (this.usuarioform.get('rut')?.hasError('required')) {
        this.errormessage = 'El Rut es obligatorio.';
      } else if (this.usuarioform.get('nombre')?.hasError('required')) {
        this.errormessage = 'El nombre es obligatorio.';
      } else if (this.usuarioform.get('a_paterno')?.hasError('required')) {
        this.errormessage = 'El Apellido es obligatorio.';
      } else if (this.usuarioform.get('a_materno')?.hasError('required')) {
        this.errormessage = 'El Apellido es obligatorio.';
      } else if (this.usuarioform.get('email')?.hasError('email')) {
        this.errormessage = 'Ingrese un correo electrónico válido.';
      } else if (this.usuarioform.get('contrasena')?.hasError('required')) {
        this.errormessage = 'La contraseña es obligatoria.';
      }
      return;
    }
    
    const loading = await this.loadingController.create({
      message: 'Usuario creado',
    });
    await loading.present();

    const registerData: Usuario = this.usuarioform.value;
  }


}
