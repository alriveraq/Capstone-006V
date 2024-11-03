import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { publicaciones } from '../interface/publicacion';
import { reunion } from '../interface/reunion';
import { JuntaService } from '../service/juntaservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-c-publicacion',
  templateUrl: './c-publicacion.page.html',
  styleUrls: ['./c-publicacion.page.scss'],
})
export class CPublicacionPage implements OnInit {
  errormessage: string = '';
  publicacionform!: FormGroup;
  reunionform!: FormGroup;
  selectedImage: File | null = null;
  enviarPorCorreo: boolean = false; 
  tipoEntrada: string = 'noticia';

  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  constructor(
    private api: JuntaService,
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private router: Router
  ) {}

  ngOnInit() {
    this.publicacionform = this.formBuilder.group({
      'titulo': ['', [Validators.required]],
      'contenido': ['', [Validators.required]],
      'imagen': ['', [Validators.required]],
      'enviarPorCorreo': [false],
    });

    this.reunionform = this.formBuilder.group({
      'tema': ['', [Validators.required]],
      'u_fecha_reunion': ['', [Validators.required]],
      'enviarPorCorreo': [false],
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedImage = input.files[0];
      this.convertToBase64(this.selectedImage).then((base64Image) => {
        this.publicacionform.patchValue({ imagen: base64Image });
      });
    }
  }

  convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  cambiarFormulario() {
  }

  async cPublicacion() {
    if (this.publicacionform.invalid) {
      if (this.publicacionform.get('titulo')?.hasError('required')) {
        this.errormessage = 'El título es obligatorio.';
      }
      if (this.publicacionform.get('imagen')?.hasError('required')) {
        this.errormessage = 'La imagen es obligatoria.';
      } else if (this.publicacionform.get('contenido')?.hasError('required')) {
        this.errormessage = 'El contenido es obligatorio.';
      }
      return;
    }

    const publicacionData: publicaciones = {
      ...this.publicacionform.value,
      id_usuario: localStorage.getItem('id_usuario'),
      id_junta: localStorage.getItem('id_junta'),
      enviarCorreo: this.publicacionform.value.enviarPorCorreo, 
    };

    console.log('Datos a enviar:', publicacionData);

    this.api
      .creacionPublicacion(
        publicacionData.id_junta,
        publicacionData.id_usuario,
        publicacionData.titulo,
        publicacionData.contenido,
        publicacionData.imagen,
        publicacionData.enviarCorreo
      )
      .subscribe(
        async (response) => {
          console.log('Respuesta de la API:', response);
          this.router.navigate(['/principal']);
        },
        async (error) => {
          console.error('Error de la API:', error);
        }
      );
  }

  async cReunion() {
    if (this.reunionform.invalid) {
      if (this.reunionform.get('tema')?.hasError('required')) {
        this.errormessage = 'El tema es obligatorio.';
      } else if (this.reunionform.get('u_fecha_reunion')?.hasError('required')) {
        this.errormessage = 'La fecha de la reunión es obligatoria.';
      }
      return;
    }

    const reunionData: reunion = {
      ...this.reunionform.value,
      id_usuario: localStorage.getItem('id_usuario'),
      id_junta: localStorage.getItem('id_junta'),
      resumen: ' ',
      enviarCorreo: this.reunionform.value.enviarPorCorreo, 
    };

    console.log('Datos a enviar:', reunionData);

    this.api
      .crearReunion(
        reunionData.id_junta,
        reunionData.id_usuario,
        reunionData.tema,
        reunionData.resumen,
        new Date(reunionData.u_fecha_reunion),
        reunionData.enviarCorreo,
      ).subscribe(
        async (response) => {
          console.log('Respuesta de la API:', response);
          this.router.navigate(['/principal']);
        },
        async (error) => {
          console.error('Error de la API:', error);
        }
      );
}

}
