import { Component, OnInit } from '@angular/core';
import { peticion } from '../interface/peticion';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-peticion',
  templateUrl: './peticion.page.html',
  styleUrls: ['./peticion.page.scss'],
})
export class PeticionPage implements OnInit {
  tipoSolicitud: string = '';
  descripcionSolicitud: string = '';
  fechaHoraSolicitud: string = ''; 
  peticionform!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
  ) {  }

  ngOnInit() { 

    this.peticionform = this.formBuilder.group({
      'tipo_solicitud': ['', [Validators.required]],
      'fecha_inicio': ['', [Validators.required]],
      'fecha_fin': ['', [Validators.required]],
      'descripcion': [false],
      'tema': ['', [Validators.required]]
    });

  }



  enviarSolicitud() {
    if (this.peticionform.invalid) {
      console.log("Por favor complete todos los campos requeridos.");
      return;
    }

    const solicitudData = {
      tipoSolicitud: this.peticionform.get('tipoSolicitud')?.value,
      descripcion: this.peticionform.get('descripcion')?.value,
      fecha_inicio: this.peticionform.get('fecha_inicio')?.value,
      fecha_fin: this.peticionform.get('fecha_fin')?.value,
    };

    console.log('Solicitud:', solicitudData);

  }
}