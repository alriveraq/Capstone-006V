import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JuntapPage } from './juntap.page';

const routes: Routes = [
  {
    path: '',
    component: JuntapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JuntapPageRoutingModule {}
