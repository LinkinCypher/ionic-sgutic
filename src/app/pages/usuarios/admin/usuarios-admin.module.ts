import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { UsuariosAdminPageRoutingModule } from './usuarios-admin-routing.module';
import { UsuariosAdminPage } from './usuarios-admin.page';

// Importa el módulo de UsuariosCreatePage
import { UsuariosCreatePageModule } from '../create/usuarios-create.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuariosAdminPageRoutingModule,
    UsuariosCreatePageModule // import para el modal
  ],
  declarations: [UsuariosAdminPage]
})
export class UsuariosAdminPageModule {}
