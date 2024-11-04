import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PeticionPageRoutingModule } from './peticion-routing.module';

import { PeticionPage } from './peticion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PeticionPageRoutingModule
  ],
  declarations: [PeticionPage]
})
export class PeticionPageModule {}
