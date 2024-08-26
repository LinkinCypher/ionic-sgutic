import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'usuarios-admin',
    loadChildren: () => import('./pages/usuarios-admin/usuarios-admin.module').then( m => m.UsuariosAdminPageModule)
  },
  {
    path: 'usuarios-create',
    loadChildren: () => import('./pages/usuarios-create/usuarios-create.module').then( m => m.UsuariosCreatePageModule)
  },
  {
    path: 'usuarios-edit/:id',  // Asegúrate de que la ruta incluye el parámetro :id
    loadChildren: () => import('./pages/usuarios-edit/usuarios-edit.module').then(m => m.UsuariosEditPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
