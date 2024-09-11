import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuariosCreatePageRoutingModule } from './usuarios-create-routing.module';

import { UsuariosCreatePage } from './usuarios-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuariosCreatePageRoutingModule
  ],
  declarations: [UsuariosCreatePage]
})
export class UsuariosCreatePageModule {}
