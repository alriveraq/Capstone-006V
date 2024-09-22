import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LogincomponentComponent } from './logincomponent/logincomponent.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginserviceService } from './loginservice/loginservice.service';


@NgModule({
  declarations: [
    LogincomponentComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule
  ],
  providers: [
    LoginserviceService
  ]
})
export class LoginModule { }
