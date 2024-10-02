import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormularioPageRoutingModule } from './cpu-admin-routing.module';

import { CpuFormularioPage } from './cpu-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormularioPageRoutingModule
  ],
  declarations: [CpuFormularioPage]
})
export class FormularioPageModule {}
