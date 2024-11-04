import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JuntaDetallePageRoutingModule } from './junta-detalle-routing.module';

import { JuntaDetallePage } from './junta-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JuntaDetallePageRoutingModule
  ],
  declarations: [JuntaDetallePage]
})
export class JuntaDetallePageModule {}
