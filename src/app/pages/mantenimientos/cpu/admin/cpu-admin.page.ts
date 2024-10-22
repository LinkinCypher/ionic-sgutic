import { Component, OnInit } from '@angular/core';
import { FormularioService } from 'src/app/servicios/formulario.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './cpu-admin.page.html',
  styleUrls: ['./cpu-admin.page.scss'],
})
export class CpuFormularioPage implements OnInit {
  formularios: any[] = [];
  sortColumn: string = ''; // Columna actual para ordenar
  sortDirection: string = 'asc'; // Dirección de la ordenación ('asc' o 'desc')

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

  // Método para ordenar por una columna específica
  ordenarPor(columna: string) {
    if (this.sortColumn === columna) {
      // Cambia la dirección de la ordenación si ya está ordenado por la misma columna
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // Cambia la columna de ordenación
      this.sortColumn = columna;
      this.sortDirection = 'asc'; // Reinicia la dirección
    }

    this.formularios.sort((a, b) => {
      const valueA = a[columna];
      const valueB = b[columna];

      if (this.sortDirection === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });
  }

  recargarPagina() {
    this.cargarMisFormularios(); // Recargar los formularios
  }
  
}