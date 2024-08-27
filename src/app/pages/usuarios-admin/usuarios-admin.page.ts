import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../servicios/usuarios.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-usuarios-admin',
  templateUrl: './usuarios-admin.page.html',
  styleUrls: ['./usuarios-admin.page.scss'],
})
export class UsuariosAdminPage implements OnInit {
  usuarios: any[] = [];

  constructor(private usuariosService: UsuariosService, private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd && event.url === '/usuarios-admin')
    ).subscribe(() => {
      this.cargarUsuarios(); // Recargar usuarios cuando se navega a la página
    });
  }

  ngOnInit() {
    this.cargarUsuarios(); // Cargar usuarios al iniciar la página
  }

  cargarUsuarios() {
    this.usuariosService.getUsuarios().subscribe(data => {
      this.usuarios = data;
      console.log('Lista de usuarios:', this.usuarios);
    }, error => {
      console.error('Error al cargar los usuarios:', error);
    });
  }

  crearUsuario() {
    this.router.navigate(['/usuarios-create']);
  }

  editarUsuario(id: string) {
    this.router.navigate([`/usuarios-edit/${id}`]);
  }

  eliminarUsuario(id: string) {
    if (confirm('¿Estás seguro de que deseas desactivar este usuario?')) {
      this.usuariosService.eliminarUsuario(id).subscribe(() => {
        this.cargarUsuarios(); // Recargar la lista de usuarios después de eliminar uno
      }, error => {
        console.error('Error al eliminar (desactivar) el usuario:', error);
      });
    }
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
    return estado ? 'Activo' : 'Desactivado';
  }
  
  getEstadoColor(estado: boolean): string {
    return estado ? 'success' : 'danger'; // 'success' para verde, 'danger' para rojo
  }
  
  
}
