import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './registercomponent-routing.module';
import { RegistercomponentComponent } from './registercomponent.component'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RegisterserviceService } from '../service/registerservice.service';



@NgModule({
  declarations: [
    RegistercomponentComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule
  ],
  providers: [
    RegisterserviceService
  ]
})
export class RegisterModule { }