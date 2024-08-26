import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth'; // URL de la API

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) {}

  login(credentials: { usuario: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        // Guarda el token en localStorage
        localStorage.setItem('access_token', response.access_token);
      })
    );
  }

  logout(): void {
    // Elimina el token de localStorage
    localStorage.removeItem('access_token');
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
      console.log('Decoded Token:', decodedToken); // Verifica el contenido del token
      return decodedToken.rol; // Rol sea el campo correcto del token
    }
    return 0; // Retorna 0 si no hay token o si el rol no es válido
  }
  

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  // Método para decodificar el token y obtener datos adicionales
  getDecodedToken(): any {
    const token = this.getToken();
    if (token) {
      return this.jwtHelper.decodeToken(token);
    }
    return null;
  }
}
