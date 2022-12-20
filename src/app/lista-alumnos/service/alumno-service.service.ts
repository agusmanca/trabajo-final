import { Injectable } from '@angular/core';
import { AlumnoDto } from '../model/alumnoDto';
import { CalificacionesDto } from '../model/calidicaciones';

@Injectable({
  providedIn: 'root'
})
export class AlumnoServiceService {

  private alumnos: Array<AlumnoDto> = new Array();
  private asignatura: Array<string> = ['Lengua','Matematica','Geografia','Musica'];

  constructor() { 
    this. setAlumnosModelMock();
  }

  private setAlumnosModelMock(): void {
    let alumno1: AlumnoDto = {
      id: 1,
      nombre: 'Jim',
      apellido: 'Morrison',
      edad: 15,
      curso: 4,
      division: 'B',
      calificaciones: [
          {
              id:1,
              asignatura:'Lengua',
              calificacion: 8
          },
          {
              id:2,
              asignatura:'Matematica',
              calificacion: 6
          },
          {
            id:3,
            asignatura:'Geografia',
            calificacion: 8
          },
          {
            id:4,
            asignatura:'Musica',
            calificacion: 9
          }
      ]
    };

    let alumno2: AlumnoDto = {
      id: 2,
      nombre: 'Eric',
      apellido: 'Clapton',
      edad: 16,
      curso: 5,
      division: 'C',
      calificaciones: [
        {
            id:1,
            asignatura:'Lengua',
            calificacion: 5
        },
        {
            id:2,
            asignatura:'Matematica',
            calificacion: 9
        },
        {
          id:3,
          asignatura:'Geografia',
          calificacion: 7
        },
        {
          id:4,
          asignatura:'Musica',
          calificacion: 7
        }
      ]
    };

    let alumno3: AlumnoDto = {
      id: 3,
      nombre: 'John',
      apellido: 'Doe',
      edad: 16,
      curso: 5,
      division: 'A',
      calificaciones: [
        {
            id:1,
            asignatura:'Lengua',
            calificacion: 5
        },
        {
            id:2,
            asignatura:'Matematica',
            calificacion: 9
        },
        {
          id:3,
          asignatura:'Geografia',
          calificacion: 7
        },
        {
          id:4,
          asignatura:'Musica',
          calificacion: 7
        }
      ]
    };

    this.alumnos = [alumno1, alumno2, alumno3];
  }

  public getAlumnosList(): Array<AlumnoDto> {
    return this.alumnos;
  }

  public getAsignaturasList(): Array<string> {
    return this.asignatura;
  }

  public getAlumnoById(id: number): any {
      let val: Array<AlumnoDto> = this.alumnos.filter(alu => alu.id == id);
      return (val.length > 0) ? val[0] : undefined;
  }

  public saveNewAlumno(alumnoNuevo: AlumnoDto){
      alumnoNuevo.id = this.alumnos.length + 1;
      this.alumnos = [...this.alumnos, alumnoNuevo];
  }

  public deleteAlumno(id: number): boolean {
      let flag: boolean = false; 
      let aluDel = this.alumnos.filter(alu => alu.id == id)[0];
      
      if(aluDel) {        
        this.alumnos = this.alumnos.filter(alu => alu.id !== id);       
        flag = true;
      }
      return flag;
  }

  public updateAlumno(alumnoActualizado: AlumnoDto): boolean {
    let flag: boolean = false;

    let idx = this.alumnos.findIndex(alu => alu.id == alumnoActualizado.id);
    if(idx >= 0) {
      this.alumnos[idx] = alumnoActualizado;
      flag = true;
    }
       
    return flag;
  }
}
