import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';

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

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.credentials).subscribe(
      () => {
        // Verifica el rol del usuario después del login
        const rol = this.authService.obtenerRolUsuario();
        if (rol === 1) {
          // Redirige a la página home si es un administrador
          this.router.navigate(['/home']);
        } else {
          // Redirige a una página específica según el rol del usuario
          this.router.navigate(['/home']); // Cambiar según la lógica de roles
        }
      },
      (error) => {
        console.error('Error en el login:', error);
        this.loginError = 'Usuario o contraseña incorrectos. Inténtalo de nuevo.';
      }
    );
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}
