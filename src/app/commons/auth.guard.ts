import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppState } from '../state/app.state';
import { executeLogoutAc, setUserLogedAc } from '../state/login/login.action';
import { UserStateModel } from '../state/login/user.state.model';
import { UsuarioDto } from '../usuarios/model/usuarioDto';
import { UsuariosService } from '../usuarios/servicios/usuarios.service';
import { UserRoleEnum } from './userRoleEnum';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    usuario: UsuarioDto | undefined;
    userState$: Observable<UserStateModel | null> = new Observable();
    userStateSubject: BehaviorSubject<UserStateModel> = new BehaviorSubject<UserStateModel>({ id: 0, username: '', nombre: '', role: UserRoleEnum.UNREGISTERED});
  
    constructor(public router: Router, private userService: UsuariosService, private store: Store<AppState>) {
        this.userState$ = this.userStateSubject.asObservable();
    }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
              
        return (this.usuario?.role != null && this.usuario?.role == UserRoleEnum.ADMIN);
    }

    isAuth(): boolean {
      let auth = localStorage.getItem('auth');
      return (auth != null && auth == 'true');
    }

    getUser(): Observable<UserStateModel | null>  {
        let user: string | null = localStorage.getItem('user');
        if(user == null) {
            user = '';
        }

        this.usuario = this.userService.getUsuarioByName(user);

        if(this.usuario) {
            const userState: UserStateModel = {
                id: this.usuario.id,
                username: this.usuario.username,
                nombre: this.usuario.nombre + ' ' + this.usuario.apellido,
                role: this.usuario.role
            }
            
            this.userStateSubject.next(userState);
        }
        return this.userState$;
    }

    login(usuario: string, pass: string) {
        this.usuario = this.userService.getUsuarioByName(usuario);

        if(this.usuario && this.usuario.username == usuario && this.usuario.pass == pass) {
            const userState: UserStateModel = {
              id: this.usuario.id,
              username: this.usuario.username,
              nombre: this.usuario.nombre + ' ' + this.usuario.apellido,
              role: this.usuario.role
            }

            this.userStateSubject.next(userState);
            this.store.dispatch(setUserLogedAc(userState));
            localStorage.setItem('auth', 'true');
            localStorage.setItem('user', usuario);
            this.router.navigate(['']);
            return; 

        } else {

            this.logout();
            this.router.navigate(['login']);
            return;
        }
    }

    logout() {
        this.store.dispatch(executeLogoutAc());

        localStorage.removeItem('auth');
        localStorage.removeItem('user');
    }

    getRefresh(): void {
        let user: string | null = localStorage.getItem('user');
        this.userService.refreshCall().then(() => {
            if(user != null) {
                this.usuario = this.userService.getUsuarioByName(user);

                if(this.usuario) {
                    const userState: UserStateModel = {
                        id: this.usuario.id,
                        username: this.usuario.username,
                        nombre: this.usuario.nombre + ' ' + this.usuario.apellido,
                        role: this.usuario.role
                    }
                   
                    this.userStateSubject.next(userState);
                    this.store.dispatch(setUserLogedAc(userState));
                }
            }
        }); 
    }
}
