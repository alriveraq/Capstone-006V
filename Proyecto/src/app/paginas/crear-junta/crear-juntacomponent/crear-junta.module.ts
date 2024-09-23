import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CrearJuntaPageRoutingModule } from './crear-junta-routing.module';

import { CrearJuntaPage } from './crear-junta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearJuntaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CrearJuntaPage]
})
export class CrearJuntaPageModule {}
