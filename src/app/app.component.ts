import { Component, OnInit } from '@angular/core';
import { AuthService } from './servicios/auth.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  esAdmin = false;
  esFormulario = true; // Variable que controla si el usuario tiene acceso a formularios
  nombreUsuario: string | null = null;  // Variable para almacenar el nombre del usuario
  mostrarSubMenuFormularios = false; // Nueva variable para controlar el submenú

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private menu: MenuController
  ) {}

  ngOnInit() {
    this.authService.getAuthStatus().subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.authService.getUserRole().subscribe(rol => {
          this.esAdmin = rol === 1;
          this.esFormulario = [1, 2, 3].includes(rol); // Permitir que usuarios con rol 1 o 2 accedan a formularios
        });

        // Obtener el nombre del usuario logueado
        this.nombreUsuario = this.authService.getNombreUsuario();
      } else {
        this.esAdmin = false;
        this.nombreUsuario = null;
      }
    });
  }

  closeMenu() {
    this.menu.close(); // Cierra el menú al seleccionar una opción
  }

  toggleSubMenuFormularios() {
    this.mostrarSubMenuFormularios = !this.mostrarSubMenuFormularios; // Alterna la visibilidad del submenú
  }

  logout() {
    this.authService.logout(); // Limpia el token y otros datos del usuario
  }
}
