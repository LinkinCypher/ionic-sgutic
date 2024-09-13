import { Component, OnInit } from '@angular/core';
import { FormularioService } from 'src/app/servicios/formulario.service'; // Asegúrate de la ruta correcta

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage implements OnInit {
  formularios: any[] = [];

  constructor(private formularioService: FormularioService) {}

  ngOnInit() {
    this.cargarMisFormularios();
  }

  cargarMisFormularios() {
    this.formularioService.obtenerMisFormularios().subscribe(
      (data) => {
        this.formularios = data;
        console.log('Formularios cargados:', this.formularios);
      },
      (error) => {
        console.error('Error al obtener los formularios:', error);
      }
    );
  }
}
