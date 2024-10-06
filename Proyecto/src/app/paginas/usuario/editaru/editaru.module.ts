import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


import { EditaruPageRoutingModule } from './editaru-routing.module';

import { EditaruPage } from './editaru.page';

import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    EditaruPageRoutingModule,
    IonicModule,
    ReactiveFormsModule
  ],
  declarations: [EditaruPage]
})
export class EditaruPageModule {}
