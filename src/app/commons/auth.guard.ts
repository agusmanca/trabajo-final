import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserRoleEnum } from './userRoleEnum';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      let role = localStorage.getItem('role');  
      
      switch(role) {
          case UserRoleEnum.ADMIN.toString():
              return true;
          case UserRoleEnum.USER.toString():
              return false;
          case UserRoleEnum.UNREGISTERED.toString():
              return false;
          default:
              return false;    
      }          
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

  login(usuario: string) {

      if(usuario.toLocaleLowerCase() == 'admin') {
        localStorage.setItem('role', '0');
        localStorage.setItem('auth', 'true');
        this.router.navigate(['']);
        return; 
      }

      if(usuario.toLocaleLowerCase() == 'user') {
        localStorage.setItem('role', '1');
        localStorage.setItem('auth', 'true');
        this.router.navigate(['']);
        return;
      }

      localStorage.setItem('role', '2');
      localStorage.setItem('auth', 'false');
      this.router.navigate(['login']);
  }

  logout() {
    localStorage.removeItem('auth');
  }
}
