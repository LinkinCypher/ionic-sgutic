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
    porcentaje: '',
    pulgadas: '',
    tipo: '',
    numeroScan: '',
    direccionIP: '',
    numeroImpresiones: '',
    nombreRegistrado: '',
    extension: '',
    smartTV: '',
  };

  mostrarCamposCPU: boolean = false; // Controlar la visualización de CPU
  mostrarCamposMON: boolean = false; // Controlar la visualización de Monitor
  mostrarCamposTEC: boolean = false; // Controlar la visualización de Teclado
  mostrarCamposMOU: boolean = false; // Controlar la visualización de Mouse
  mostrarCamposUAE: boolean = false; // Controlar la visualización de Unidades de Almacenamiento
  mostrarCamposCPO: boolean = false; // Controlar la visualización de Cámara Polycom
  mostrarCamposESC: boolean = false; // Controlar la visualización de Escáner
  mostrarCamposIMP: boolean = false; // Controlar la visualización de Impresora
  mostrarCamposLAP: boolean = false; // Controlar la visualización de Laptop
  mostrarCamposLEC: boolean = false; // Controlar la visualización de Lector de Barras
  mostrarCamposPAR: boolean = false; // Controlar la visualización de Parlante
  mostrarCamposTIP: boolean = false; // Controlar la visualización de Teléfono IP
  mostrarCamposTVS: boolean = false; // Controlar la visualización de Televisores

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
    this.mostrarCamposMON = this.formulario.articulo === 'MON'
    this.mostrarCamposTEC = this.formulario.articulo === 'TEC';
    this.mostrarCamposMOU = this.formulario.articulo === 'MOU';
    this.mostrarCamposUAE = this.formulario.articulo === 'UAE';
    this.mostrarCamposCPO = this.formulario.articulo === 'CPO';
    this.mostrarCamposESC = this.formulario.articulo === 'ESC';
    this.mostrarCamposIMP = this.formulario.articulo === 'IMP';
    this.mostrarCamposLAP = this.formulario.articulo === 'LAP';
    this.mostrarCamposLEC = this.formulario.articulo === 'LEC';
    this.mostrarCamposPAR = this.formulario.articulo === 'PAR';
    this.mostrarCamposTIP = this.formulario.articulo === 'TIP';
    this.mostrarCamposTVS = this.formulario.articulo === 'TVS';
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
      porcentaje: '',
      pulgadas: '',
      tipo: '',
      numeroScan: '',
      direccionIP: '',
      numeroImpresiones: '',
      nombreRegistrado: '',
      extension: '',
      smartTV: '',
    };
    // Restablecer la visualización al restablecer el formulario
    this.mostrarCamposCPU = false; 
    this.mostrarCamposMON = false;
    this.mostrarCamposTEC = false;
    this.mostrarCamposMOU = false;
    this.mostrarCamposUAE = false;
    this.mostrarCamposCPO = false;
    this.mostrarCamposESC = false;
    this.mostrarCamposIMP = false;
    this.mostrarCamposLAP = false;
    this.mostrarCamposLEC = false;
    this.mostrarCamposPAR = false;
    this.mostrarCamposTIP = false;
    this.mostrarCamposTVS = false;
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
        // Limpiar el formulario después de guardarlo exitosamente
        this.resetForm();
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