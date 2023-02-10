import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthGuard } from 'src/app/commons/auth.guard';
import { UserRoleEnum } from 'src/app/commons/userRoleEnum';
import { AppState } from 'src/app/state/app.state';
import { userSelect } from 'src/app/state/login/login.selector';
import { UserStateModel } from 'src/app/state/login/user.state.model';
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
  userModel!: UserStateModel | null;
  
  constructor(public usuarioService: UsuariosService,
              public store: Store<AppState>,
              public router: Router) { 

      this.store.select(userSelect).subscribe((user: UserStateModel | null) => {
        this.userModel = user;
      });

      this.usuarioService.getUserList().subscribe((usuarios: Array<UsuarioDto>) => {          
          this.usuarios = usuarios;
      });
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
      let currentUser: UsuarioDto | undefined = this.usuarioService.getUsuarioById(id);

      if(!currentUser || currentUser.id == id){
          console.log("No puede eliminar el usuario activo");
          return
      }
      
      this.usuarioService.deleteUsuario(id);
      this.usuarioService.getUserList().subscribe((usuarios: Array<UsuarioDto>) => {
        this.usuarios = usuarios;
      }); 
  }

  isAuth(): boolean {
      return (this.userModel?.role == UserRoleEnum.ADMIN);
  }
}
