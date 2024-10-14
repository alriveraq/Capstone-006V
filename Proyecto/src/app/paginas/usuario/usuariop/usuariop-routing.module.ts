import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuariopPage } from './usuariop.page';
import { AuthGuard } from '../../auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: UsuariopPage,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariopPageRoutingModule {}
