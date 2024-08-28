import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../servicios/usuarios.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../servicios/auth.service';

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

      // Si la columna es 'rol' o 'estado', se deben usar los métodos personalizados para obtener el texto adecuado
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
      this.sortDirection = !this.sortDirection; // Cambia la dirección si ya está ordenando por esta columna
    } else {
      this.sortColumn = column; // Cambia la columna de orden
      this.sortDirection = true; // Reinicia la dirección a ascendente
    }
    this.usuarios = this.sortUsuarios(this.usuarios, this.sortColumn, this.sortDirection); // Ordena los usuarios
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
    return estado ? 'Activo' : 'Inactivo';
  }
  
  getEstadoColor(estado: boolean): string {
    return estado ? 'success' : 'danger'; // Verde para activo, rojo para inactivo
  }  
  
  // Método para formatear la fecha, retorna vacío si es null o undefined
  formatFecha(fecha: string | null): string {
    if (!fecha) {
      return '';
    }
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(fecha).toLocaleDateString('es-ES', options);
  }
}
