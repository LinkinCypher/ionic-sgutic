import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { ToastController } from '@ionic/angular'; // Importar ToastController

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  credentials = {
    usuario: '',
    password: ''
  };
  loginError: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController // Inyectar ToastController
  ) {}

  async login() {
    this.loginError = null; // Reiniciar cualquier error previo
    this.authService.login(this.credentials).subscribe(
      async () => {
        const rol = this.authService.obtenerRolUsuario();
        if (rol === 1) {
          this.router.navigate(['/home']);
        } else {
          this.router.navigate(['/home']); // Cambiar según la lógica de roles
        }
      },
      async (error) => {
        console.error('Error en el login:', error);
        this.loginError = 'Usuario o contraseña incorrectos. Inténtalo de nuevo.';
        await this.mostrarToast(this.loginError, 'danger'); // Mostrar un toast con el error
      }
    );
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
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
