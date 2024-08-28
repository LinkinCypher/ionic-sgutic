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
  nombreUsuario: string | null = null;  // Variable para almacenar el nombre del usuario

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

  logout() {
    this.authService.logout(); // Limpia el token y otros datos del usuario
  }
}
