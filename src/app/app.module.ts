import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'; // Importa el módulo HTTP
import { JwtModule, JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt'; // Importa JwtModule y JwtHelperService
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule, // Asegúrate de que HttpClientModule está importado
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token');
        },
        allowedDomains: [new URL(environment.apiUrl).hostname], // Usa el dominio de la URL de la API desde environment
      },
    }),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    JwtHelperService, // Añade JwtHelperService aquí
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, // Asegura la configuración de JWT
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
