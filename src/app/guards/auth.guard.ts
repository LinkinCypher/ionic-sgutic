import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service'; // Asegúrate de que la ruta sea correcta
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const rolesPermitidos = route.data['roles']; // Roles permitidos para la ruta
    const rolUsuario = this.authService.obtenerRolUsuario(); // Método para obtener el rol del usuario actual

    // Verifica si el rol del usuario está en la lista de roles permitidos
    if (rolesPermitidos && rolesPermitidos.includes(rolUsuario)) {
      return true; // Acceso permitido
    } else {
      // Si el rol no está permitido, redirige a una página de "no autorizado" o "inicio"
      this.router.navigate(['/home']); // O redirige a cualquier otra ruta
      return false; // Acceso denegado
    }
  }
}
