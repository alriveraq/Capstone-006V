import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth/auth.guard';
import { CrearJuntaPage } from './crear-junta.page'; 

const routes: Routes = [
  {
    path: '',
    component: CrearJuntaPage,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearJuntaPageRoutingModule {}
