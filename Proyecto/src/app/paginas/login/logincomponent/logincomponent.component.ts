import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { LoginserviceService } from '../loginservice/loginservice.service';
import { Login } from '../interface/login'; 

@Component({
  selector: 'app-logincomponent',
  templateUrl: './logincomponent.component.html',
  styleUrls: ['./logincomponent.component.scss'],
})
export class LogincomponentComponent implements OnInit {
  loginform!: FormGroup; 
  errormessage: string = '';

  constructor(
    private api: LoginserviceService,
    private formBuilder: FormBuilder,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loginform = this.formBuilder.group({
      u_email: ['', [Validators.required, Validators.email]],
      u_contrasena: ['', Validators.required]
    });
  }

  async login() {
    if (this.loginform.invalid) {
      if (this.loginform.get('u_email')?.hasError('required')) {
        this.errormessage = 'El correo electrónico es obligatorio.';
      } else if (this.loginform.get('u_email')?.hasError('email')) {
        this.errormessage = 'Ingrese un correo electrónico válido.';
      } else if (this.loginform.get('u_contrasena')?.hasError('required')) {
        this.errormessage = 'La contraseña es obligatoria.';
      }
      return;
    }
    
    const loading = await this.loadingController.create({
      message: 'Iniciando sesión...',
    });
    await loading.present();

    const loginData: Login = this.loginform.value;

    this.api.login(loginData.u_email, loginData.u_contrasena).subscribe(
      async (response) => {
        await loading.dismiss();
        localStorage.setItem('token', response.token);
        localStorage.setItem('id_usuario', response.id);
        console.log('Token:', response.token);
        console.log('ID de usuario:', response.id);
        this.router.navigate(['/principal']); 

      },
      async (error) => {
        await loading.dismiss();
        this.errormessage = 'Los datos de inicio de sesión no son correctos.';
      }
    );
  }
}

