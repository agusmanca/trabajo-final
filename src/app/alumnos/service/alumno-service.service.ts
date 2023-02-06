import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AlumnoDto } from '../model/alumnoDto';

@Injectable({
  providedIn: 'root'
})
export class AlumnoServiceService {

  private alumnos$!: Observable<AlumnoDto[]>;
  private alumnosSubject: BehaviorSubject<AlumnoDto[]> = new BehaviorSubject<AlumnoDto[]>([]) ;
  private alumnos: Array<AlumnoDto> = new Array();
  private asignatura: Array<string> = ['Angular','React','Java','Go'];

  private url:string = environment.mockApiUrl + 'alumnos';
  private headers: HttpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});

  constructor(private httpService: HttpClient) { 
    this.alumnos$ = this.alumnosSubject.asObservable();

    this.httpService.get<Array<AlumnoDto>>(this.url).subscribe((alumnos: Array<AlumnoDto>) => {
        this.alumnosSubject.next(alumnos);
        this.alumnos = this.alumnosSubject.getValue();
    });
  }

  /*
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
              asignatura:'Angular',
              calificacion: 8
          },
          {
              id:2,
              asignatura:'React',
              calificacion: 6
          },
          {
            id:3,
            asignatura:'Java',
            calificacion: 8
          },
          {
            id:4,
            asignatura:'Go',
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
            asignatura:'Angular',
            calificacion: 5
        },
        {
            id:2,
            asignatura:'React',
            calificacion: 9
        },
        {
          id:3,
          asignatura:'Java',
          calificacion: 7
        },
        {
          id:4,
          asignatura:'Go',
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
            asignatura:'Angular',
            calificacion: 5
        },
        {
            id:2,
            asignatura:'React',
            calificacion: 9
        },
        {
          id:3,
          asignatura:'Java',
          calificacion: 7
        },
        {
          id:4,
          asignatura:'Go',
          calificacion: 7
        }
      ]
    };

    this.alumnos = [alumno1, alumno2, alumno3];
  } */

  public getAlumnosList(): Observable<Array<AlumnoDto>> {
    return this.alumnos$;
  }

  public getAsignaturasList(): Array<string> {
    return this.asignatura;
  }

  public getAlumnoById(id: number): any {
      let val: Array<AlumnoDto> = this.alumnos.filter(alu => alu.id == id);
      return (val.length > 0) ? val[0] : undefined;
  }

  public saveNewAlumno(alumnoNuevo: AlumnoDto){
      this.httpService.post<AlumnoDto>(this.url, alumnoNuevo, { headers: this.headers }).subscribe({
          next: data => {
              this.httpService.get<Array<AlumnoDto>>(this.url).subscribe((alumnos: Array<AlumnoDto>) => {
                  this.alumnosSubject.next(alumnos);
                  this.alumnos = this.alumnosSubject.getValue();
              });
          }, 
          error: err => {
            console.log(err);
          }
      });
  }

  public updateAlumno(alumnoActualizado: AlumnoDto): boolean {
      let flag: boolean = false;

      let idx = this.alumnos.findIndex(alu => alu.id == alumnoActualizado.id);
      if(idx >= 0) {
          this.httpService.put<AlumnoDto>(`${this.url}/${alumnoActualizado.id}`, alumnoActualizado).subscribe({
            next: data => {
                this.httpService.get<Array<AlumnoDto>>(this.url).subscribe((alumnos: Array<AlumnoDto>) => {
                    this.alumnosSubject.next(alumnos);
                    this.alumnos = this.alumnosSubject.getValue();
                    flag = true;
                });
            },
            error: err => {
              console.log(err);
            }
          });
      }
        
      return flag;
  }

  public deleteAlumno(id: number): boolean {
      let flag: boolean = false; 
      let aluDel = this.alumnos.filter(alu => alu.id == id)[0];
      
      if(aluDel) {       
          this.httpService.delete<AlumnoDto>(`${this.url}/${id}`, { headers: this.headers }).subscribe({
              next: data => {
                  this.httpService.get<Array<AlumnoDto>>(this.url).subscribe((alumnos: Array<AlumnoDto>) => {
                    this.alumnosSubject.next(alumnos);
                    this.alumnos = this.alumnosSubject.getValue();
                    flag = true;
                  });
              },
              error: err => {
                  console.log(err);
              }
          });
      }
      return flag;
  }
}
