import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuariopPageRoutingModule } from './usuariop-routing.module';

import { UsuariopPage } from './usuariop.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuariopPageRoutingModule
  ],
  declarations: [UsuariopPage]
})
export class UsuariopPageModule {}
