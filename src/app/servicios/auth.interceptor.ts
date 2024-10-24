// para manejar la caducidad de la sesión

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service'; // Importa tu servicio de autenticación
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // La sesión ha caducado o el usuario no está autorizado
          this.authService.logout(); // Opcional: limpia los datos de la sesión
          this.router.navigate(['/login']); // Redirige a la página de inicio de sesión
        }
        return throwError(error);
      })
    );
  }
}
