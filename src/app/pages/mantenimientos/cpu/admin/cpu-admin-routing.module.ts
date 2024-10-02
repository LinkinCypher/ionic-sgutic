import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CpuFormularioPage } from './cpu-admin.page';

const routes: Routes = [
  {
    path: '',
    component: CpuFormularioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormularioPageRoutingModule {}
