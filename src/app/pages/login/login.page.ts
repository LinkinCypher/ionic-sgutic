import { Component } from '@angular/core';
import { UsuariosService } from '../../servicios/usuarios.service';
import { Router } from '@angular/router';

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

  constructor(private usuariosService: UsuariosService, private router: Router) {}

  login() {
    console.log('Credentials:', this.credentials);
    this.usuariosService.login(this.credentials).subscribe(response => {
      console.log('Login exitoso:', response);
      // Guardar token en el almacenamiento local o cookies, según necesites
      localStorage.setItem('token', response.access_token);
      // Redirigir a la página
      this.router.navigate(['/home']);
    }, error => {
      console.error('Error en el login:', error);
      alert('Usuario o contraseña incorrectos');
    });
  }
}
