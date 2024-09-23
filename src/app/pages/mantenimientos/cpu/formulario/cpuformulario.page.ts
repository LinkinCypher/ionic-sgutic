import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormularioService } from 'src/app/servicios/formulario.service';
import { Router } from '@angular/router';
import * as $ from 'jquery'; // Importa jQuery
import 'datatables.net'; // Importa DataTables

@Component({
  selector: 'app-formulario',
  templateUrl: './cpuformulario.page.html',
  styleUrls: ['./cpuformulario.page.scss'],
})
export class CpuFormularioPage implements OnInit, AfterViewInit {
  formularios: any[] = [];

  constructor(
    private formularioService: FormularioService, 
    private router: Router,
  ) {}

  ngOnInit() {
    this.cargarMisFormularios();
  }

  cargarMisFormularios() {
    this.formularioService.obtenerMisFormularios().subscribe(
      (data) => {
        this.formularios = data;
        console.log('Formularios cargados:', this.formularios);
        this.inicializarDataTable(); // Inicializa DataTables después de cargar los datos
      },
      (error) => {
        console.error('Error al obtener los formularios:', error);
      }
    );
  }

  ngAfterViewInit() {
    this.inicializarDataTable(); // Inicializa DataTables después de que la vista esté lista
  }

  inicializarDataTable() {
    // Espera a que la vista y los datos se carguen completamente
    setTimeout(() => {
      $('#formulariosTable').DataTable();
    }, 1000);
  }

  recargarPagina() {
    this.cargarMisFormularios(); // Vuelve a cargar los formularios
  }
}
