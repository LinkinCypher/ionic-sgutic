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
    usuario:'',
    oficina: '',
    observacion: '',
    ram: '',
    procesador: '',
    sistemaOperativo: '',
    almacenamiento: '',
    porcentaje: ''
  };

  mostrarCamposCPU: boolean = false; // Controlar la visualización de CPU
  mostrarCamposLaptop: boolean = false; // Controlar la visualización de Laptop

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
    this.mostrarCamposLaptop = this.formulario.articulo === 'LAPTOP';
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
      usuario:'',
      oficina: '',
      observacion: '',
      ram: '',
      procesador: '',
      sistemaOperativo: '',
      almacenamiento: '',
      porcentaje: ''
    };
    // Restablecer la visualización al restablecer el formulario
    this.mostrarCamposCPU = false; 
    this.mostrarCamposLaptop = false;
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
    if (!this.formulario.institucion || !this.formulario.provincia || !this.formulario.edificio || !this.formulario.articulo || !this.formulario.oficina) {
      this.mostrarToast('Algunos campos son obligatorios', 'danger');
      return false;
    }
    return true;
  }

  crearFormulario() {
    if (this.validarFormulario()) {
      this.formularioService.crearFormulario(this.formulario).subscribe(() => {
        this.mostrarToast('Formulario creado exitosamente');
        
        // Emitir evento para notificar que se ha creado un formulario
        this.formularioService.notificarFormularioCreado();
  
        // Redirigir a la página de administración
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