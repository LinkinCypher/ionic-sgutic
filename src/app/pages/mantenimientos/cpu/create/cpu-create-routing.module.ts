import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CpuCreatePage } from './cpu-create.page';

const routes: Routes = [
  {
    path: '',
    component: CpuCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CpuCreatePageRoutingModule {}
