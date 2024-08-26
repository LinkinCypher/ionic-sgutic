import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from '../../servicios/usuarios.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-usuarios-edit',
  templateUrl: './usuarios-edit.page.html',
  styleUrls: ['./usuarios-edit.page.scss'],
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
      }, error => {
        this.mostrarToast('Error al cargar el usuario', 'danger');
        console.error('Error al cargar el usuario:', error);
      });
    }
  }

  // Propiedad calculada para invertir el valor del toggle
  get estadoInvertido() {
    return !this.usuario.estado; // Invertir el valor
  }

  set estadoInvertido(value: boolean) {
    this.usuario.estado = !value; // Invertir el valor
  }

  actualizarUsuario() {
    const id = this.route.snapshot.paramMap.get('id')!;
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
}
