import { Component } from '@angular/core';
import { UsuariosService } from '../../servicios/usuarios.service';
import { Router } from '@angular/router';

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
    rol: 2, // Rol por defecto, por ejemplo, Gestor
    estado: true,
    fecha_nacimiento: ''
  };

  constructor(private usuariosService: UsuariosService, private router: Router) {}

  crearUsuario() {
    this.usuariosService.crearUsuario(this.usuario).subscribe(() => {
      console.log('Usuario creado exitosamente');
      this.router.navigate(['/usuarios-admin']); // Redirige a la lista de usuarios
    }, error => {
      console.error('Error al crear el usuario:', error);
    });
  }
}
