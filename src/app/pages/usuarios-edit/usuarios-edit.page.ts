import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from '../../servicios/usuarios.service';

@Component({
  selector: 'app-usuarios-edit',
  templateUrl: './usuarios-edit.page.html',
  styleUrls: ['./usuarios-edit.page.scss'],
})
export class UsuariosEditPage implements OnInit {
  usuario: any = {};

  constructor(
    private usuariosService: UsuariosService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!; // Obtiene el ID de la URL
    this.usuariosService.getUsuario(id).subscribe(data => { // Llama al método correcto para obtener un solo usuario
      this.usuario = data;
    });
  }
  

  actualizarUsuario() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.usuariosService.actualizarUsuario(id, this.usuario).subscribe(() => {
      console.log('Usuario actualizado exitosamente');
      this.router.navigate(['/usuarios-admin']); // Redirige a la lista de usuarios
    }, error => {
      console.error('Error al actualizar el usuario:', error);
    });
  }
}
