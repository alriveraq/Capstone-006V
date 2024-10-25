import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JuntaidPageRoutingModule } from './juntaid-routing.module';

import { JuntaidPage } from './juntaid.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JuntaidPageRoutingModule
  ],
  declarations: [JuntaidPage]
})
export class JuntaidPageModule {}
