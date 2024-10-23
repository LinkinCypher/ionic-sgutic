import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';


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
    loadChildren: () => import('./pages/usuarios/admin/usuarios-admin.module').then(m => m.UsuariosAdminPageModule),
    canActivate: [AuthGuard], // Protege la ruta
    data: { roles: [1] } // Solo los administradores (rol 1) pueden acceder
  },
  {
    path: 'usuarios-edit/:id',
    loadChildren: () => import('./pages/usuarios/edit/usuarios-edit.module').then(m => m.UsuariosEditPageModule),
    canActivate: [AuthGuard], // Protege la ruta
    data: { roles: [1] } // Solo los administradores (rol 1) pueden acceder
  },
  {
    path: 'cpu-admin',
    loadChildren: () => import('./pages/mantenimientos/cpu/admin/cpu-admin.module').then( m => m.FormularioPageModule),
    canActivate: [AuthGuard], // Protege la ruta
    data: { roles: [1, 40] } // Define los roles que pueden acceder
  },   {
    path: 'cpu-create',
    loadChildren: () => import('./pages/mantenimientos/cpu/create/cpu-create.module').then( m => m.CpuCreatePageModule),
    canActivate: [AuthGuard], // Protege la ruta
    data: { roles: [1, 40, 41] } // Define los roles que pueden acceder
  },
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
