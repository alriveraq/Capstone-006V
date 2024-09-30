import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JuntapPage } from './juntap.page';
import { AuthGuard } from '../../auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: JuntapPage,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JuntapPageRoutingModule {}
