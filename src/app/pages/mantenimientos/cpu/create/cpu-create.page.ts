import { Component, OnInit } from '@angular/core';
import { FormularioService } from 'src/app/servicios/formulario.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular'; // Importar ToastController

@Component({
  selector: 'app-cpu-create',
  templateUrl: './cpu-create.page.html',
  styleUrls: ['./cpu-create.page.scss'],
})
export class CpuCreatePage {
  formulario: any = {}; // Objeto para almacenar los datos del formulario

  constructor(
    private formularioService: FormularioService,
    private router: Router,
    private toastController: ToastController // Inyectar ToastController
  ) {}

  async mostrarToast(mensaje: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color: color,
    });
    toast.present();
  }

  crearFormulario() {
    this.formularioService.crearFormulario(this.formulario).subscribe(
      (response) => {
        console.log('Formulario creado con éxito:', response);
        this.router.navigate(['/cpu-admin']); // Redirige a la página de administración
      },
      (error) => {
        console.error('Error al crear el formulario:', error);
      }
    );
  }
}