import { Component, OnInit } from '@angular/core';
import { FormularioService } from 'src/app/servicios/formulario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario',
  templateUrl: './cpuformulario.page.html',
  styleUrls: ['./cpuformulario.page.scss'],
})
export class CpuFormularioPage implements OnInit {
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
      },
      (error) => {
        console.error('Error al obtener los formularios:', error);
      }
    );
  }

  regresar() {
    this.router.navigate(['/usuarios-admin']); // Redirige a la página de administración de usuarios
  }
}
