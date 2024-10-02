import { Component, OnInit } from '@angular/core';
import { FormularioService } from 'src/app/servicios/formulario.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './cpu-admin.page.html',
  styleUrls: ['./cpu-admin.page.scss'],
})
export class CpuFormularioPage implements OnInit {
  formularios: any[] = [];

  constructor(
    private formularioService: FormularioService
  ) {}

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

  recargarPagina() {
    this.cargarMisFormularios(); // Recargar los formularios
  }
  
}