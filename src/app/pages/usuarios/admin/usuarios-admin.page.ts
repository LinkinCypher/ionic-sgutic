import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../servicios/usuarios.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../../servicios/auth.service';

@Component({
  selector: 'app-usuarios-admin',
  templateUrl: './usuarios-admin.page.html',
  styleUrls: ['./usuarios-admin.page.scss'],
})
export class UsuariosAdminPage implements OnInit {
  usuarios: any[] = [];
  nombreUsuario: string | null = null;
  sortColumn: string = 'apellidos'; // Columna por defecto para ordenar
  sortDirection: boolean = true; // true para ascendente, false para descendente
  searchTerm: string = ''; // Término de búsqueda

  constructor(
    private usuariosService: UsuariosService,
    private authService: AuthService,
    private router: Router
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd && event.url === '/usuarios-admin')
    ).subscribe(() => {
      this.cargarUsuarios(); // Recargar usuarios cuando se navega a la página
    });
  }

  ngOnInit() {
    this.cargarUsuarios(); // Cargar usuarios al iniciar la página
    this.nombreUsuario = this.authService.getNombreUsuario(); // Obtener el nombre del usuario
  }

  recargarPagina() {
    this.cargarUsuarios(); // Vuelve a cargar los usuarios desde el servidor
  }

  cargarUsuarios() {
    this.usuariosService.getUsuarios().subscribe(data => {
      this.usuarios = this.sortUsuarios(data, this.sortColumn, this.sortDirection);
      console.log('Lista de usuarios:', this.usuarios);
    }, error => {
      console.error('Error al cargar los usuarios:', error);
    });
  }

  sortUsuarios(usuarios: any[], column: string, direction: boolean): any[] {
    return usuarios.sort((a, b) => {
      let aValue = a[column];
      let bValue = b[column];

      if (column === 'rol') {
        aValue = this.getRolTexto(a.rol);
        bValue = this.getRolTexto(b.rol);
      } else if (column === 'estado') {
        aValue = this.getEstadoTexto(a.estado);
        bValue = this.getEstadoTexto(b.estado);
      }

      if (aValue < bValue) {
        return direction ? -1 : 1;
      } else if (aValue > bValue) {
        return direction ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

  toggleSort(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = !this.sortDirection;
    } else {
      this.sortColumn = column;
      this.sortDirection = true;
    }
    this.usuarios = this.sortUsuarios(this.usuarios, this.sortColumn, this.sortDirection);
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

  buscarUsuarios() {
    console.log('Término de búsqueda:', this.searchTerm); // Verifica el término de búsqueda
    if (this.searchTerm.trim() === '') {
      this.cargarUsuarios(); // Si no hay término de búsqueda, cargar todos los usuarios
    } else {
      this.usuariosService.buscarUsuarios(this.searchTerm).subscribe(data => {
        this.usuarios = this.sortUsuarios(data, this.sortColumn, this.sortDirection);
        console.log('Usuarios filtrados:', this.usuarios); // Verifica los usuarios filtrados
      }, error => {
        console.error('Error al buscar usuarios:', error);
      });
    }
  }   

  getRolTexto(rol: number): string {
    switch (rol) {
      case 1:
        return 'Administrador';
      case 20:
        return 'Supervisor de Soporte Tecnológico';
      case 21:
        return 'Soporte Tecnológico';
      case 30:
        return 'Supervisor de Equipos Tecnológicos';
      case 31:
        return 'Equipos Tecnológicos';
      case 40:
        return 'Supervisor de Mantenimiento Tecnológico';
      case 41:
        return 'Mantenimiento Tecnológico';
      case 50:
        return 'Supervisor de Proyectos Tecnológicos';
      case 51:
        return 'Proyectos Tecnológicos';
      case 60:
        return 'Usuario de Solo Lectura';
      default:
        return 'Desconocido';
    }
  }

  getEstadoTexto(estado: boolean): string {
    return estado ? 'Activo' : 'Inactivo';
  }
  
  getEstadoColor(estado: boolean): string {
    return estado ? 'success' : 'danger';
  }  
  
  formatFecha(fecha: string | null): string {
    if (!fecha) {
      return '';
    }
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(fecha).toLocaleDateString('es-ES', options);
  }
}
