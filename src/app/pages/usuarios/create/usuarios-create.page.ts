import { Component } from '@angular/core';
import { UsuariosService } from '../../../servicios/usuarios.service';
import { Router } from '@angular/router';
import { ToastController, ModalController } from '@ionic/angular'; // Importar ModalController

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
    rol: 4, // Rol por defecto
    estado: true, // Por defecto se crea un usuario con el estado true
    fecha_nacimiento: ''
  };

  constructor(
    private usuariosService: UsuariosService,
    private router: Router,
    private toastController: ToastController,
    private modalController: ModalController // Inyectar ModalController
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
        this.modalController.dismiss({ usuarioCreado: true }); // Cerrar el modal con datos
      }, error => {
        this.mostrarToast('El nombre de usuario ya existe', 'danger');
        console.error('Error al crear el usuario:', error);
      });
    }
  }

  cerrarModal() {
    this.modalController.dismiss(); // Cierra el modal sin datos
  }

  // Autogenerar el usuario a partir de nombres y apellidos
  autocompletarUsuario() {
    const nombresArray = this.usuario.nombres.trim().split(' ');
    const apellidosArray = this.usuario.apellidos.trim().split(' ');

    // Tomar el primer nombre y el primer apellido
    const primerNombre = nombresArray[0] ? nombresArray[0].toLowerCase() : '';
    const primerApellido = apellidosArray[0] ? apellidosArray[0].toLowerCase() : '';

    // Concatenar el primer nombre y el primer apellido
    this.usuario.usuario = `${primerNombre}${primerApellido}`;
  }
}
