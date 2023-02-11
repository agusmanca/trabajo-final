import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { exhaustMap, from, map, mergeMap, Observable, tap } from "rxjs";
import { AuthGuard } from "src/app/commons/auth.guard";
import { returnRegisterUser } from './login.action'

@Injectable()
export class LoginEffects {

    refreshRegisterUsers$ = createEffect(() => this.actions$.pipe(
        ofType("[Login] Recargar usuario registrado"),
        mergeMap(() => this.auth.getRefresh().pipe(
            map(data => ({type: "[Login] Usuario registrado recargado"}))
        )
    )));


    goLogin$ = createEffect(() => this.actions$.pipe(
        ofType("[Login] Finalizar Sesion"),
        mergeMap(() => from(this.router.navigate(['login'])).pipe(
            map(data => ({type: "[Login] Verificar estado session"}))
        )
    )));

    constructor(private actions$: Actions, private auth: AuthGuard, public router: Router){
    }
}