import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditaruPage } from './editaru.page';


const routes: Routes = [
  {
    path: '',
    component: EditaruPage, 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditaruPageRoutingModule {}
