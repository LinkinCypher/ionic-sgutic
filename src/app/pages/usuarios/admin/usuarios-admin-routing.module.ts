import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuariosAdminPage } from './usuarios-admin.page';

const routes: Routes = [
  {
    path: '',
    component: UsuariosAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosAdminPageRoutingModule {}
