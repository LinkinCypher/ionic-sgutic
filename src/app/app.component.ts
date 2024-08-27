import { Component, OnInit } from '@angular/core';
import { AuthService } from './servicios/auth.service';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  esAdmin = false;

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private cdr: ChangeDetectorRef,
    private menu: MenuController
  ) {}

  ngOnInit() {
    this.verificarRol();
  }

  verificarRol() {
    const rol = this.authService.obtenerRolUsuario();
    console.log('Rol del usuario:', rol); // Verifica que el rol sea 1
    this.esAdmin = rol === 1;
    console.log('Es Admin:', this.esAdmin); // Verifica que esAdmin se configure como true
    this.cdr.detectChanges();
  }  

  closeMenu() {
    this.menu.close(); // Cierra el menú al seleccionar una opción
  }

  logout() {
    this.authService.logout(); // Limpia el token y otros datos del usuario
  }
}
