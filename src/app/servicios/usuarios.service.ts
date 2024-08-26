import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = 'http://localhost:3000'; // URL de la API de NestJS

  constructor(private http: HttpClient) { }

  // Método para obtener el token desde el almacenamiento local
  private getToken(): string {
    return localStorage.getItem('token') || '';
  }

  // Método para obtener los encabezados con el token JWT
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`
    });
  }

  // Método para iniciar sesión
  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, credentials);
  }

  // Método para obtener un usuario
  getUsuario(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/${id}`, { headers: this.getHeaders() });
  }
  

  // Método para obtener todos los usuarios (solo para administradores)
  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users/all`, { headers: this.getHeaders() });
  }

  // Método para crear un nuevo usuario (solo para administradores)
  crearUsuario(usuario: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users/create`, usuario, { headers: this.getHeaders() });
  }

  // Método para actualizar un usuario existente (solo para administradores)
  actualizarUsuario(id: string, usuario: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/users/update/${id}`, usuario, { headers: this.getHeaders() });
  }

  // Método para eliminar un usuario (borrado lógico, solo para administradores)
  eliminarUsuario(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/users/delete/${id}`, { headers: this.getHeaders() });
  }
}