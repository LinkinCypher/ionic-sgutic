import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CpuCreatePageRoutingModule } from './cpu-create-routing.module';

import { CpuCreatePage } from './cpu-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CpuCreatePageRoutingModule
  ],
  declarations: [CpuCreatePage]
})
export class CpuCreatePageModule {}
