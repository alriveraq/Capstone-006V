import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PeticionPage } from './peticion.page';

const routes: Routes = [
  {
    path: '',
    component: PeticionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PeticionPageRoutingModule {}
