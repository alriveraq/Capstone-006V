import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JuntaDetallePage } from './junta-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: JuntaDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JuntaDetallePageRoutingModule {}
