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
      let role = localStorage.getItem('role');
      return (role) ? role : '2';
    }

    getUser(): UsuarioDto | undefined{
      return this.usuario;
    }

    login(usuario: string) {
        this.usuario = this.userService.getUsuarioByName(usuario);
        
        if(this.usuario == undefined) {
            localStorage.setItem('role', '2');
            localStorage.setItem('auth', 'false');
            this.router.navigate(['login']);
            return;
        }



        if(this.usuario?.role == UserRoleEnum.ADMIN) {
            localStorage.setItem('role', '0');
            localStorage.setItem('auth', 'true');
            this.router.navigate(['']);
            return; 
        }

        if(this.usuario?.role == UserRoleEnum.USER) {
            localStorage.setItem('role', '1');
            localStorage.setItem('auth', 'true');
            this.router.navigate(['']);
            return;
        }
    }

    logout() {
      localStorage.removeItem('role');
      localStorage.removeItem('auth');
    }
}
