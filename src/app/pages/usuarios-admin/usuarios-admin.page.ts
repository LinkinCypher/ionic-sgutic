import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../servicios/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios-admin',
  templateUrl: './usuarios-admin.page.html',
  styleUrls: ['./usuarios-admin.page.scss'],
})
export class UsuariosAdminPage implements OnInit {
  usuarios: any[] = []; // Array para almacenar los usuarios

  constructor(private usuariosService: UsuariosService, private router: Router) {}

  ngOnInit() {
    this.cargarUsuarios(); // Cargar los usuarios al iniciar la página
  }

  cargarUsuarios() {
    this.usuariosService.getUsuarios().subscribe(data => {
      this.usuarios = data; // Asigna los usuarios obtenidos al array
      console.log('Lista de usuarios:', this.usuarios); // Log para mostrar la lista de usuarios
    }, error => {
      console.error('Error al cargar los usuarios:', error);
    });
  }

  crearUsuario() {
    // Navegar a la página de creación de usuarios (si la implementas)
    this.router.navigate(['/usuarios-create']);
  }

  editarUsuario(id: string) {
    // Navegar a la página de edición de usuarios (si la implementas)
    this.router.navigate([`/usuarios-edit/${id}`]);
  }

  eliminarUsuario(id: string) {
    this.usuariosService.eliminarUsuario(id).subscribe(() => {
      this.cargarUsuarios(); // Recargar la lista de usuarios después de eliminar uno
    }, error => {
      console.error('Error al eliminar el usuario:', error);
    });
  }

  getRolTexto(rol: number): string {
    switch (rol) {
      case 1:
        return 'Administrador';
      case 2:
        return 'Gestor';
      case 3:
        return 'Técnico';
      case 4:
        return 'Usuario';
      default:
        return 'Desconocido';
    }
  }

  getEstadoTexto(estado: boolean): string {
    return estado ? 'Desactivado' : 'Activo';
  }
  
  getEstadoColor(estado: boolean): string {
    return estado ? 'danger' : 'success'; // 'success' para verde, 'danger' para rojo
  }
  
  
}
