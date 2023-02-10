import { UserRoleEnum } from "src/app/commons/userRoleEnum";
import { UserStateModel } from "./user.state.model";

export interface LoginStateModel {
    user: UserStateModel | null,
    role: UserRoleEnum,
    isLoged: boolean
}