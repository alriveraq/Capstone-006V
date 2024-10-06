import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
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

  {
    path: 'register',
    loadChildren: () => import('./paginas/register/registercomponent/registercomponent.module').then( m => m.RegisterModule)
  },
  
  {
    path: 'crear-junta',
    loadChildren: () => import('./paginas/crear-junta/crear-juntacomponent/crear-junta.module').then( m => m.CrearJuntaPageModule)
  },
  {
    path: 'juntap/:id_usuario',
    loadChildren: () => import('./paginas/junta/juntap/juntap.module').then( m => m.JuntapPageModule)
  },
  {
    path: 'usuariop',
    loadChildren: () => import('./paginas/usuario/usuariop/usuariop.module').then( m => m.UsuariopPageModule)
  },
  {
    path: 'editaru',
    loadChildren: () => import('./paginas/usuario/editaru/editaru.module').then( m => m.EditaruPageModule)
  },
  {
    path: 'solicitud',
    loadChildren: () => import('./paginas/junta/solicitud/solicitud.module').then( m => m.SolicitudPageModule)
  }




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
