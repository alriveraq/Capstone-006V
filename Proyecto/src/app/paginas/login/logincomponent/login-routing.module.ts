import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogincomponentComponent } from './logincomponent.component';

const routes: Routes = [
  { path: '', component: LogincomponentComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
<<<<<<< HEAD
export class LoginRoutingModule { }
=======
export class LoginRoutingModule { }
>>>>>>> 3298823d57b92c91fa6d9cddc441fb144c6d6e97
