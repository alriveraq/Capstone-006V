<<<<<<< HEAD
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
=======
import { Component, NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LogincomponentComponent } from './paginas/login/logincomponent/logincomponent.component';
>>>>>>> 3298823d57b92c91fa6d9cddc441fb144c6d6e97

const routes: Routes = [
  {
    path: '',
    redirectTo: 'principal',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'principal',
    loadChildren: () => import('./paginas/principal/principal.module').then( m => m.PrincipalPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./paginas/login/logincomponent/login.module').then( m => m.LoginModule)
  },
<<<<<<< HEAD

  {
    path: 'register',
    loadChildren: () => import('./paginas/register/registercomponent/registercomponent.module').then( m => m.RegisterModule)
  },
  
  {
    path: 'crear-junta',
    loadChildren: () => import('./paginas/crear-junta/crear-juntacomponent/crear-junta.module').then( m => m.CrearJuntaPageModule)
  }
=======
>>>>>>> 3298823d57b92c91fa6d9cddc441fb144c6d6e97


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
