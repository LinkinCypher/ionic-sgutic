import { Component, OnInit } from '@angular/core';
import { FormularioService } from 'src/app/servicios/formulario.service';
import * as $ from 'jquery'; // Importa jQuery
import 'datatables.net'; // Importa DataTables

@Component({
  selector: 'app-formulario',
  templateUrl: './cpuformulario.page.html',
  styleUrls: ['./cpuformulario.page.scss'],
})
export class CpuFormularioPage implements OnInit {
  formularios: any[] = [];
  dataTable: any;

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
        this.inicializarDataTable(); // Inicializa DataTables después de cargar los datos
      },
      (error) => {
        console.error('Error al obtener los formularios:', error);
      }
    );
  }

  inicializarDataTable() {
    if (this.dataTable) {
      this.dataTable.destroy(); // Destruye la instancia anterior si existe
    }
    
    this.dataTable = $('#formulariosTable').DataTable({
      data: this.formularios,
      columns: [
        { data: 'numeroFormulario' },
        { data: 'institucion' },
        { data: 'provincia' },
        { data: 'edificio' }
      ],
      language: {
        "decimal": "",
        "emptyTable": "No hay información",
        "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
        "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
        "infoFiltered": "(Filtrado de _MAX_ total entradas)",
        "infoPostFix": "",
        "thousands": ",",
        "lengthMenu": "Mostrar _MENU_ Entradas",
        "loadingRecords": "Cargando...",
        "processing": "Procesando...",
        "search": "Buscar:",
        "zeroRecords": "Sin resultados encontrados",
        "paginate": {
            "first": "Primero",
            "last": "Ultimo",
            "next": "Siguiente",
            "previous": "Anterior"
        }
      },
    });
  }

  recargarPagina() {
    // Recargar los formularios y reiniciar la tabla
    this.cargarMisFormularios();
  }
}
