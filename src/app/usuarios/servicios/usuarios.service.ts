import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UsuarioDto } from '../model/usuarioDto';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private usuarios$!: Observable<UsuarioDto[]>;
  private usuariosSubject: BehaviorSubject<UsuarioDto[]> = new BehaviorSubject<UsuarioDto[]>([]) ;
  public  usuarios: Array<UsuarioDto> = new Array();

  private url:string = environment.mockApiUrl2 + 'usuarios';
  private headers: HttpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});

  constructor(private httpService: HttpClient) {
      this.usuarios$ = this.usuariosSubject.asObservable();

      this.httpService.get<Array<UsuarioDto>>(this.url).subscribe((users: Array<UsuarioDto>) => {
          this.usuariosSubject.next(users);
          this.usuarios = this.usuariosSubject.getValue();
      });
  }

  /*
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
  } */

  async refreshCall(): Promise<UsuarioDto[]> {
    return new Promise((resolve) => {
        this.httpService.get<Array<UsuarioDto>>(this.url).subscribe((users: Array<UsuarioDto>) => {
            this.usuariosSubject.next(users);
            this.usuarios = this.usuariosSubject.getValue();
            resolve(this.usuarios);
        });
    })
  } 

  getUserList(): Observable<Array<UsuarioDto>> {
    return this.usuarios$;
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
        console.log("El usuario ya existe");
        return
      }

      this.httpService.post<UsuarioDto>(this.url, user, { headers: this.headers }).subscribe({
        next: data => {
          this.httpService.get<Array<UsuarioDto>>(this.url).subscribe((getUsers: Array<UsuarioDto>) => {
              this.usuariosSubject.next(getUsers);
              this.usuarios = this.usuariosSubject.getValue();
          });
        }, 
        error: err => {
          console.log(err);
        }
      });
  }

  updateUsuario(user: UsuarioDto) {
      let idx = this.usuarios.findIndex(us => us.id == user.id);
      if(idx >= 0) {
          this.httpService.put<UsuarioDto>(`${this.url}/${user.id}`, user).subscribe({
              next: data => {
                  this.httpService.get<Array<UsuarioDto>>(this.url).subscribe((getUsers: Array<UsuarioDto>) => {
                    this.usuariosSubject.next(getUsers);
                    this.usuarios = this.usuariosSubject.getValue();
                  });
              },
              error: err => {
                console.log(err);
              }
          });
      }
  }

  deleteUsuario(id: number) {
      let usDel: UsuarioDto = this.usuarios.filter(us => us.id == id)[0]; 
      if(usDel) {       
          this.httpService.delete<UsuarioDto>(`${this.url}/${id}`, { headers: this.headers }).subscribe({
              next: data => {
                  this.httpService.get<Array<UsuarioDto>>(this.url).subscribe((getUsers: Array<UsuarioDto>) => {
                    this.usuariosSubject.next(getUsers);
                    this.usuarios = this.usuariosSubject.getValue();
                  });
              },
              error: err => {
                  console.log(err);
              }
          });
      }
  }
}
