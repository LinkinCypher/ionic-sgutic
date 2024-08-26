import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuariosCreatePage } from './usuarios-create.page';

const routes: Routes = [
  {
    path: '',
    component: UsuariosCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosCreatePageRoutingModule {}
