import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/commons/auth.guard';
import { UserRoleEnum } from 'src/app/commons/userRoleEnum';
import { UsuarioDto } from '../model/usuarioDto';
import { UsuariosService } from '../servicios/usuarios.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  usuarios: Array<UsuarioDto> = new Array();
  columnsName: string[] = ['nombre', 'username', 'pass', 'role','actualizar', 'eliminar', 'detalle'];

  constructor(public usuarioService: UsuariosService,
              public authService: AuthGuard,
              public router: Router) { 
    
      this.usuarios = this.usuarioService.getUserList();            
  }

  ngOnInit(): void {
  }

  crearUsuario() {
      this.router.navigate(['usuarios','abm-usuarios', 0]);
  }

  actualizarUsuario(id: number) {
      this.router.navigate(['usuarios','abm-usuarios', id]);
  }

  eliminarUsuario(id: number) {
    this.usuarioService.deleteUsuario(id);
    this.usuarios = this.usuarioService.getUserList(); 
  }

  isAuth(): boolean {
      if(this.authService.getRole() == UserRoleEnum.ADMIN.toString()){
        return true;
      } else {
        return false;
      }
  }
}
