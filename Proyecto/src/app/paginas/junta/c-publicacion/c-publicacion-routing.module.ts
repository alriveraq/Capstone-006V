import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CPublicacionPage } from './c-publicacion.page';

const routes: Routes = [
  {
    path: '',
    component: CPublicacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CPublicacionPageRoutingModule {}
