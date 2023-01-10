import { CalificacionesDto } from "./calidicaciones";

export class AlumnoDto {
    id!: number;
    nombre!: string;
    apellido!: string;
    edad!: number;
    curso!: number;
    division!: string;
    calificaciones!: Array<CalificacionesDto>;
}