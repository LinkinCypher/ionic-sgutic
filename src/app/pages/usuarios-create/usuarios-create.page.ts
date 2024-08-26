import { Component } from '@angular/core';
import { UsuariosService } from '../../servicios/usuarios.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular'; // Importar ToastController

@Component({
  selector: 'app-usuarios-create',
  templateUrl: './usuarios-create.page.html',
  styleUrls: ['./usuarios-create.page.scss'],
})
export class UsuariosCreatePage {
  usuario = {
    nombres: '',
    apellidos: '',
    usuario: '',
    password: '',
    rol: 2, // Rol por defecto, por ejemplo, Gestor
    estado: true,
    fecha_nacimiento: ''
  };

  constructor(
    private usuariosService: UsuariosService,
    private router: Router,
    private toastController: ToastController // Inyectar ToastController
  ) {}

  async mostrarToast(mensaje: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color: color,
    });
    toast.present();
  }

  crearUsuario() {
    this.usuariosService.crearUsuario(this.usuario).subscribe(() => {
      this.mostrarToast('Usuario creado exitosamente');
      this.router.navigate(['/usuarios-admin']); // Redirige a la lista de usuarios
    }, error => {
      this.mostrarToast('Error al crear el usuario', 'danger');
      console.error('Error al crear el usuario:', error);
    });
  }
}
