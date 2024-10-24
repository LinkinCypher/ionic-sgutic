import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router'; // Importa Router para redirección

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`; // URL de la API
  private authStatus = new BehaviorSubject<boolean>(this.isAuthenticated());
  private userRole = new BehaviorSubject<number>(this.obtenerRolUsuario());

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router // Inyecta Router para redirección
  ) {}

  // Método para iniciar sesión
  login(credentials: { usuario: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        // Guarda el token en localStorage
        localStorage.setItem('access_token', response.access_token);
        this.authStatus.next(true); // Actualiza el estado de autenticación
        this.userRole.next(this.obtenerRolUsuario()); // Actualiza el rol del usuario
      })
    );
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('access_token'); // Elimina el token de localStorage
    this.authStatus.next(false); // Actualiza el estado de autenticación
    this.userRole.next(0); // Resetea el rol del usuario
    this.router.navigate(['/login']); // Redirige a la página de login
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    const isExpired = token ? this.jwtHelper.isTokenExpired(token) : true;
    console.log('Token válido:', !isExpired);
    return !isExpired;
  }

  // Obtener el rol del usuario desde el token
  obtenerRolUsuario(): number {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      console.log('Decoded Token:', decodedToken);
      return decodedToken.rol;
    }
    return 0;
  }

  // Obtener el token desde localStorage
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  // Decodificar el token para obtener sus datos
  getDecodedToken(): any {
    const token = this.getToken();
    if (token) {
      return this.jwtHelper.decodeToken(token);
    }
    return null;
  }

  // Observables para suscribirse a los cambios en la autenticación y rol
  getAuthStatus(): Observable<boolean> {
    return this.authStatus.asObservable();
  }

  getUserRole(): Observable<number> {
    return this.userRole.asObservable();
  }

  // Obtener el nombre del usuario desde el token decodificado
  getNombreUsuario(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.username || null;
    }
    return null;
  }
}
