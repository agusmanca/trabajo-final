import { Injectable } from '@angular/core';
import { UserRoleEnum } from 'src/app/commons/userRoleEnum';
import { UsuarioDto } from '../model/usuarioDto';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  usuarios: Array<UsuarioDto> = new Array();

  constructor() {
      this.getUsuariosMock();
  }

  getUsuariosMock() {
      this.usuarios = [
        {
          id: 1,
          username: 'admin',
          pass: 'admin',
          nombre: 'Jack',
          apellido: 'Black',
          role: UserRoleEnum.ADMIN
        },
        {
          id: 2,
          username: 'admin2',
          pass: 'admin2',
          nombre: 'John',
          apellido: 'Doe',
          role: UserRoleEnum.ADMIN
        },
        {
          id: 3,
          username: 'user',
          pass: 'user',
          nombre: 'Natalia',
          apellido: 'Natalia',
          role: UserRoleEnum.USER
        },
        {
          id: 4,
          username: 'user2',
          pass: 'user2',
          nombre: 'Bruce',
          apellido: 'Weyne',
          role: UserRoleEnum.USER
        },
      ]
  }

  getUserList(): Array<UsuarioDto> {
    return this.usuarios;
  }

  getUsuarioByName(username: string): UsuarioDto | undefined {
      let user: UsuarioDto = this.usuarios.filter(us => us.username == username)[0];

      if(user) {
        return user;
      } else {
        return undefined;
      }
  }

  getUsuarioById(id: number): UsuarioDto | undefined {
      let user: UsuarioDto = this.usuarios.filter(us => us.id == id)[0];

      if(user) {
        return user;
      } else {
        return undefined;
      }
  }

  crearUsuario(user: UsuarioDto) {
      
      let verifyUser = this.usuarios.filter(us => us.username == user.username);

      if(verifyUser.length > 0) {
        return
      }

      this.usuarios.push(user);
  }

  updateUsuario(user: UsuarioDto) {
      let idx = this.usuarios.findIndex(us => us.id == user.id);

      if(!idx || idx == 0){
        return
      }      
      this.usuarios[idx] = user;
  }

  deleteUsuario(id: number) {
      this.usuarios = this.usuarios.filter(us => us.id !== id);
  }
}
