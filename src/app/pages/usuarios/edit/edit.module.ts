import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuariosEditPageRoutingModule } from './edit-routing.module';

import { UsuariosEditPage } from './edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuariosEditPageRoutingModule
  ],
  declarations: [UsuariosEditPage]
})
export class UsuariosEditPageModule {}
