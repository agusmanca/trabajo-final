import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioDto } from '../usuarios/model/usuarioDto';
import { UsuariosService } from '../usuarios/servicios/usuarios.service';
import { UserRoleEnum } from './userRoleEnum';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    usuario: UsuarioDto | undefined;
  
    constructor(public router: Router, private userService: UsuariosService) { }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        
        const role = localStorage.getItem('role');  
        let rta: boolean = false;
                  
        if(role && role == UserRoleEnum.ADMIN.toString()) {
            rta = true;
        }        
        return rta;
    }

    isAuth(): boolean {
      let auth = localStorage.getItem('auth');

      if(auth && auth == 'true'){
        return true;
      }

      return false;
    }

    getRole(): string {
      const role = localStorage.getItem('role');
      return (role) ? role : '2';
    }

    getUser(): UsuarioDto | undefined {
      const user = localStorage.getItem('user');
      if(!user){
        this.logout();
      }
      return this.userService.getUsuarioByName(user!);
    }

    login(usuario: string, pass: string) {
        this.usuario = this.userService.getUsuarioByName(usuario);
        
        if(this.usuario == undefined) {
            this.logout();
            this.router.navigate(['login']);
            return;
        }

        if(this.usuario?.role == UserRoleEnum.ADMIN && this.usuario.username == usuario && this.usuario.pass == pass) {
            localStorage.setItem('role', '0');
            localStorage.setItem('auth', 'true');
            localStorage.setItem('user', usuario);
            this.router.navigate(['']);
            return; 
        }

        if(this.usuario?.role == UserRoleEnum.USER && this.usuario.username == usuario && this.usuario.pass == pass) {
            localStorage.setItem('role', '1');
            localStorage.setItem('auth', 'true');
            localStorage.setItem('user', usuario);
            this.router.navigate(['']);
            return;
        }
    }

    logout() {
      localStorage.removeItem('role');
      localStorage.removeItem('auth');
      localStorage.removeItem('user');
    }
}
