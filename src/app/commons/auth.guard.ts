import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserRoleEnum } from './userRoleEnum';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  private role: UserRoleEnum = UserRoleEnum.UNREGISTERED;

  constructor(public router: Router) { 
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      switch(this.role) {
          case UserRoleEnum.ADMIN:
              return true;
          case UserRoleEnum.USER:
              return false;
          case UserRoleEnum.UNREGISTERED:
              this.router.navigate(['login']);
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

  getRole(): UserRoleEnum {
    return this.role;
  }

  login(usuario: string) {
      if(usuario.toLocaleLowerCase() == 'admin') {
        this.role = UserRoleEnum.ADMIN;
        localStorage.setItem('auth', 'true');
        this.router.navigate(['']);
        return; 
      }

      if(usuario.toLocaleLowerCase() == 'user') {
        this.role = UserRoleEnum.USER;
        localStorage.setItem('auth', 'true');
        this.router.navigate(['']);
        return;
      }

      localStorage.setItem('auth', 'false');
      this.role = UserRoleEnum.UNREGISTERED;
  }

  logout() {
    localStorage.removeItem('auth');
  }
}
