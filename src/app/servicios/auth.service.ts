import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth'; // URL de la API
  private authStatus = new BehaviorSubject<boolean>(this.isAuthenticated());
  private userRole = new BehaviorSubject<number>(this.obtenerRolUsuario());

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) {}

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

  logout(): void {
    // Elimina el token de localStorage
    localStorage.removeItem('access_token');
    this.authStatus.next(false); // Actualiza el estado de autenticación
    this.userRole.next(0); // Resetea el rol del usuario
    // Redirige a la página de login
    window.location.href = '/login'; 
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    const isExpired = token ? this.jwtHelper.isTokenExpired(token) : true;
    console.log('Token válido:', !isExpired);
    return !isExpired;
  }

  obtenerRolUsuario(): number {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      console.log('Decoded Token:', decodedToken);
      return decodedToken.rol;
    }
    return 0;
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

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
}
