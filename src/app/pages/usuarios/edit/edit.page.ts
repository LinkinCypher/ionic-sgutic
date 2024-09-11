import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from '../../../servicios/usuarios.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-usuarios-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class UsuariosEditPage implements OnInit {
  usuario: any = {};

  constructor(
    private usuariosService: UsuariosService,
    private route: ActivatedRoute,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.usuariosService.getUsuario(id).subscribe(data => {
        this.usuario = data;
        this.usuario.password = ''; // Limpia el campo de la contraseña
      }, error => {
        this.mostrarToast('Error al cargar el usuario', 'danger');
        console.error('Error al cargar el usuario:', error);
      });
    }
  }
 
  actualizarUsuario() {
    // Verifica si los campos obligatorios están vacíos
    if (!this.usuario.nombres || !this.usuario.apellidos || !this.usuario.usuario) {
      this.mostrarToast('Por favor, complete todos los campos obligatorios.', 'danger');
      return;
    }
  
    const id = this.route.snapshot.paramMap.get('id')!;
  
    // Si el campo de contraseña está vacío, se elimina el campo antes de enviar la solicitud
    if (!this.usuario.password) {
      delete this.usuario.password;
    }
  
    this.usuariosService.actualizarUsuario(id, this.usuario).subscribe(() => {
      this.mostrarToast('Usuario actualizado exitosamente');
      this.router.navigate(['/usuarios-admin']);
    }, error => {
      this.mostrarToast('Error al actualizar el usuario', 'danger');
      console.error('Error al actualizar el usuario:', error);
    });
  } 

  async mostrarToast(mensaje: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color: color,
    });
    toast.present();
  }

  regresar() {
    this.router.navigate(['/usuarios-admin']); // Redirige a la página de administración de usuarios
  }
}
