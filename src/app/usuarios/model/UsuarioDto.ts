import { UserRoleEnum } from "src/app/commons/userRoleEnum";

export class UsuarioDto {
    id!: number;
    username!:string;
    pass!: string;
    nombre!: string;
    apellido!: string;
    role!: UserRoleEnum;
}