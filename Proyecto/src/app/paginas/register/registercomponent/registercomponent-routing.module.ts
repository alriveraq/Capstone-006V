import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistercomponentComponent } from './registercomponent.component'; 

const routes: Routes = [
  {
    path: '', component: RegistercomponentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterRoutingModule {}
