import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Asegúrate de la ruta correcta
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormularioService {
  private apiUrl = `${environment.apiUrl}/cpus`; // URL de la API de formularios de CPU

  // EventEmitter para notificar la creación de un formulario
  formularioCreado: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private http: HttpClient,
    private authService: AuthService // Inyectamos el AuthService para obtener el token
  ) {}

  // Método para obtener el token desde el servicio AuthService
  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}` // Agrega el token JWT al encabezado
    });
  }

  // Obtener los formularios creados por el usuario logueado
  obtenerMisFormularios(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}/mis-formularios`, { headers });
  }

  // Crear un nuevo formulario de CPU
  crearFormulario(formulario: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.apiUrl}/create`, formulario, { headers });
  }

  // Notificar a otras partes de la aplicación que se creó un formulario
  notificarFormularioCreado() {
    this.formularioCreado.emit();
  }

  // Actualizar un formulario existente
  actualizarFormulario(id: string, formulario: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(`${this.apiUrl}/update/${id}`, formulario, { headers });
  }

  // Obtener todos los formularios (solo para administradores)
  obtenerTodosLosFormularios(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/all`, { headers });
  }
}
