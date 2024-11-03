import { Component, OnInit } from '@angular/core';
import { Usuario } from '../Interface/usuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { RegisterserviceService } from '../service/registerservice.service';

@Component({
  selector: 'app-registercomponent',
  templateUrl: './registercomponent.component.html',
  styleUrls: ['./registercomponent.component.scss'],
})
export class RegistercomponentComponent implements OnInit {
  errormessage: string = '';
  usuarioform!: FormGroup;

  constructor(
    private api: RegisterserviceService,
    private formBuilder: FormBuilder,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
  ) {}

  ngOnInit() {
    this.usuarioform = this.formBuilder.group({
      rut: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      a_paterno: ['', [Validators.required]],
      a_materno: ['', [Validators.required]],
      tipo_casa: [0, []],
      integrantes: [0, []],
      adultos_mayores: [0, []],
      email: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required]],
      confirmarContrasena: ['', [Validators.required]], // Agregar este campo
    }, { validators: this.passwordMatchValidator }); // Agregar validador de coincidencia de contraseña
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('contrasena')?.value === form.get('confirmarContrasena')?.value
      ? null : { mismatch: true };
  }

  async register() {
    console.log('Formulario válido:', this.usuarioform.valid);
    console.log('Errores en el formulario:', this.usuarioform.errors);
    console.log('Valores del formulario:', this.usuarioform.value);
    if (this.usuarioform.invalid) {
      // Manejo de errores (muestra mensaje de error si hay algún campo requerido no completado)
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
      } else if (this.usuarioform.hasError('mismatch')) {
        this.errormessage = 'Las contraseñas no coinciden.';
      }
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Usuario creado',
    });
    await loading.present();

    const registerData: Usuario = {
      ...this.usuarioform.value,
    };

    this.api.register(
      registerData.rut,
      registerData.nombre,
      registerData.a_paterno,
      registerData.a_materno,
      registerData.tipo_casa,
      registerData.adultos_mayores,
      registerData.integrantes,
      registerData.email,
      registerData.contrasena
    ).subscribe(
      async (response) => {
        await loading.dismiss();
        this.router.navigate(['/login']);
      },
      async (error) => {
        await loading.dismiss();
        this.errormessage = 'Los datos de registro no son correctos.';
      }
    );
  }
}
