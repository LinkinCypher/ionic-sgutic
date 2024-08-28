import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = 'http://localhost:3000/users'; // URL de la API de NestJS

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Método para obtener el token desde el almacenamiento local
  private getToken(): string {
    return localStorage.getItem('token') || '';
  }

  // Método para obtener los encabezados con el token JWT
  private getHeaders(): HttpHeaders {
    const token = this.getToken();
    console.log('Token JWT:', token); // Log para comprobar el token
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // Método para iniciar sesión
  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, credentials);
  }

  // Método para obtener un usuario
  getUsuario(id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers });
  }  

  // Método para obtener todos los usuarios (solo para administradores)
  getUsuarios(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get<any[]>(`${this.apiUrl}/all`, { headers });
  }

  // Método para crear un nuevo usuario (solo para administradores)
  crearUsuario(usuario: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.post<any>(`${this.apiUrl}/create`, usuario, { headers });
  }

  // Método para actualizar un usuario existente (solo para administradores)
  actualizarUsuario(id: string, usuario: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.put<any>(`${this.apiUrl}/update/${id}`, usuario, { headers });
  }   

  // Método para eliminar un usuario (borrado lógico, solo para administradores)
  eliminarUsuario(id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`, { headers });
  }

  // Método para buscar usuarios por nombre, apellido o usuario
  buscarUsuarios(term: string): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}` // Asegúrate de usar el token de authService
    });
    return this.http.get<any[]>(`${this.apiUrl}/search?term=${term}`, { headers });
  }

}
