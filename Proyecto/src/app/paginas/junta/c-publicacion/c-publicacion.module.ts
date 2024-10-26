import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CPublicacionPageRoutingModule } from './c-publicacion-routing.module';

import { CPublicacionPage } from './c-publicacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CPublicacionPageRoutingModule
  ],
  declarations: [CPublicacionPage]
})
export class CPublicacionPageModule {}
