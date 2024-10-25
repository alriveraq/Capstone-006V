import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JuntaidPage } from './juntaid.page';
import { AuthGuard } from '../../auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: JuntaidPage,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JuntaidPageRoutingModule {}
