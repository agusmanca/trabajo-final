import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { LoginStateModel } from "./login.state.model";

export const selectItemFeature = (state: AppState) => state.login;

export const verifyIsAuthSelect = createSelector(
    selectItemFeature,
    (login: LoginStateModel) => login.isLoged
);

export const userRoleSelect = createSelector(
    selectItemFeature,
    (login: LoginStateModel) => login.role
);

export const userSelect = createSelector(
    selectItemFeature,
    (login: LoginStateModel) => login.user
);