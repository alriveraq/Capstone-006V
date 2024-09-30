import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JuntapPageRoutingModule } from './juntap-routing.module';

import { JuntapPage } from './juntap.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JuntapPageRoutingModule
  ],
  declarations: [JuntapPage]
})
export class JuntapPageModule {}
