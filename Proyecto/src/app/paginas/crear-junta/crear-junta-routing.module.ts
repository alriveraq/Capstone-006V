import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearJuntaPage } from './crear-junta.page';

const routes: Routes = [
  {
    path: '',
    component: CrearJuntaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearJuntaPageRoutingModule {}
