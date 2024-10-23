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
  formulario = {
    institucion: '',
    provincia: '',
    edificio: '',
    articulo: '',
    marca: '',
    modelo: '',
    serie: '',
    activoFijo: '',
    memoria: '',
    procesador: '',
    sistemaOperativo: '',
    discoDuro: '',
    porcentajeDiscoDuro: '',
    usuario:'',
    ubicacion: '',
    observacion: ''
  };

  mostrarCamposCPU: boolean = false; // Nueva propiedad para controlar la visualización

  constructor(
    private formularioService: FormularioService,
    private router: Router,
    private toastController: ToastController // Inyectar ToastController
  ) {}

  ngOnInit() {
    this.resetForm(); // Restablecer el formulario al cargar la página
    this.formulario.institucion = 'CNE'; // Establecer valor por defecto
    this.formulario.provincia = 'MATRIZ'; // Establecer valor por defecto
  }  

  // Método para verificar el artículo seleccionado
  onArticuloChange() {
    this.mostrarCamposCPU = this.formulario.articulo === 'CPU';
  }

  resetForm() {
    this.formulario = {
      institucion: '',
      provincia: '',
      edificio: '',
      articulo: '',
      marca: '',
      modelo: '',
      serie: '',
      activoFijo: '',
      memoria: '',
      procesador: '',
      sistemaOperativo: '',
      discoDuro: '',
      porcentajeDiscoDuro: '',
      usuario:'',
      ubicacion: '',
      observacion: ''
    };
    this.mostrarCamposCPU = false; // Restablecer la visualización al restablecer el formulario
  }

  async mostrarToast(mensaje: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color: color,
    });
    toast.present();
  }

  validarFormulario(): boolean {
    if (!this.formulario.institucion || !this.formulario.provincia || !this.formulario.edificio || !this.formulario.articulo || !this.formulario.ubicacion) {
      this.mostrarToast('Algunos campos son obligatorios', 'danger');
      return false;
    }
    return true;
  }

  crearFormulario() {
    if (this.validarFormulario()) {
      this.formularioService.crearFormulario(this.formulario).subscribe(() => {
        this.mostrarToast('Formulario creado exitosamente');
        this.router.navigate(['/cpu-admin']);
      }, error => {
        this.mostrarToast('El formulario ya existe', 'danger');
        console.error('Error al crear el formulario:', error);
      });
    }
  }

  regresar() {
    this.router.navigate(['/cpu-admin']); // Redirige a la página de administración de usuarios
  }
}