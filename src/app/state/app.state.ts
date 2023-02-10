import { ActionReducerMap } from "@ngrx/store";
import { loginReducer } from "./login/login.reducer";
import { LoginStateModel } from "./login/login.state.model";

export interface AppState {
    login: LoginStateModel;
}

export const ROOT_REDUCER: ActionReducerMap<AppState> = {
    login: loginReducer
}