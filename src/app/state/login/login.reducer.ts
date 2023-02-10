import { createReducer, on } from "@ngrx/store";
import { UserRoleEnum } from "src/app/commons/userRoleEnum";
import { executeLogoutAc, initLoginAc, initLoginComponentAc, setUserLogedAc } from "./login.action";
import { LoginStateModel } from "./login.state.model";
import { produce } from 'immer';

export const initialState: LoginStateModel = { user: null, role: UserRoleEnum.UNREGISTERED, isLoged: false }

export const loginReducer = createReducer (
    initialState,

    on(initLoginComponentAc, (currentState) => {
        const newState = produce(currentState, (copy) => {
            copy.isLoged = false;
        })
        return newState
    }),
    on(initLoginAc, (currentState) => {
        const newState = produce(currentState, (copy) => {
            copy.isLoged = false;
        })
        return newState
    }),
    
    on(setUserLogedAc, (currentState, user) => ({
        ...currentState,
        isLoged: true,
        user: user,
        role: user.role
    })),

    on(executeLogoutAc, (currentState) => {
        return { ...currentState, initialState }
    }),
);