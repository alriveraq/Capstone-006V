import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LogincomponentComponent } from './logincomponent.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
<<<<<<< HEAD
import { LoginserviceService } from '../loginservice/loginservice.service'; 
=======
import { LoginserviceService } from '../loginservice/loginservice.service';
>>>>>>> 3298823d57b92c91fa6d9cddc441fb144c6d6e97

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
<<<<<<< HEAD
export class LoginModule { }
=======
export class LoginModule { }
>>>>>>> 3298823d57b92c91fa6d9cddc441fb144c6d6e97
