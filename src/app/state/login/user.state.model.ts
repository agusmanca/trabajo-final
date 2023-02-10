import { UserRoleEnum } from "src/app/commons/userRoleEnum";

export interface UserStateModel {
    id: number,
    username:string;
    nombre: string;
    role: UserRoleEnum;
}