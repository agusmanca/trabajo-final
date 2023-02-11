import { createAction, props } from "@ngrx/store";
import { UserStateModel } from "./user.state.model";

export const initLoginComponentAc = createAction (
    '[Login] Carga Ventana Login'
);

export const initLoginAc = createAction (
    '[Login] Inicio de Sesion'
);

export const setUserLogedAc = createAction (
    '[Login] Setear usuario registrado',
    props<UserStateModel>()
);

export const executeLogoutAc = createAction (
    '[Login] Finalizar Sesion'
);

export const refreshRegisterUser = createAction (
    '[Login] Recargar usuario registrado'
);

export const returnRegisterUser = createAction (
    '[Login] Usuario registrado recargado'
);