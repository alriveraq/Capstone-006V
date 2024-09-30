import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditaruPageRoutingModule } from './editaru-routing.module';

import { EditaruPage } from './editaru.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditaruPageRoutingModule
  ],
  declarations: [EditaruPage]
})
export class EditaruPageModule {}
