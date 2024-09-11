import { Component } from '@angular/core';
import { UsuariosService } from '../../../servicios/usuarios.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular'; // Importar ToastController

@Component({
  selector: 'app-usuarios-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class UsuariosCreatePage {
  usuario = {
    nombres: '',
    apellidos: '',
    usuario: '',
    password: '',
    rol: 4, // Rl por defecto
    estado: true, // Por defeccto se crea un usuario con el estado true
    fecha_nacimiento: ''
  };

  constructor(
    private usuariosService: UsuariosService,
    private router: Router,
    private toastController: ToastController // Inyectar ToastController
  ) {}

  ngOnInit() {
    this.resetForm(); // Restablecer el formulario al cargar la página
  }

  resetForm() {
    this.usuario = {
      nombres: '',
      apellidos: '',
      usuario: '',
      password: '',
      rol: 0,
      estado: true,
      fecha_nacimiento: ''
    };
  }

  async mostrarToast(mensaje: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color: color,
    });
    toast.present();
  }

  validarFormulario(): boolean {
    if (!this.usuario.nombres || !this.usuario.apellidos || !this.usuario.usuario || !this.usuario.password || !this.usuario.rol) {
      this.mostrarToast('Todos los campos son obligatorios', 'danger');
      return false;
    }
    return true;
  }

  crearUsuario() {
    if (this.validarFormulario()) {
      this.usuariosService.crearUsuario(this.usuario).subscribe(() => {
        this.mostrarToast('Usuario creado exitosamente');
        this.router.navigate(['/usuarios-admin']);
      }, error => {
        this.mostrarToast('El nombre de usuario ya existe', 'danger');
        console.error('Error al crear el usuario:', error);
      });
    }
  }

  regresar() {
    this.router.navigate(['/usuarios-admin']); // Redirige a la página de administración de usuarios
  }
  
}
