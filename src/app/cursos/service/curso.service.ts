import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { InscripcionService } from 'src/app/inscripciones/services/inscripcion.service';
import { environment } from 'src/environments/environment';
import { CursoDto } from '../model/CursoDto';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  cursos: Array<CursoDto> = new Array();
  cursos$!: Observable<CursoDto[]>;
  cursosSubject: BehaviorSubject<CursoDto[]> = new BehaviorSubject<CursoDto[]>([]);

  private url:string = environment.mockApiUrl + 'cursos';
  private headers: HttpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});

  constructor(public httpServ: HttpClient) { 
    this.cursos$ = this.cursosSubject.asObservable();

    this.httpServ.get<CursoDto[]>(this.url).subscribe((cursos: CursoDto[]) => {
        this.cursosSubject.next(cursos);
        this.cursos = this.cursosSubject.getValue();
    });
  }

  /*
  setCursosMock(): Array<CursoDto> {
      return [
        {
          id: 1,
          descripcion: 'Angular',
          duracionHs: 180,
          fechaInicio: new Date("03/15/2023"),
          modalidad: 'Distancia',
          titular:'Juan Angular'
        },
        {
          id: 2,
          descripcion: 'React',
          duracionHs: 180,
          fechaInicio: new Date("04/01/2023"),
          modalidad: 'Distancia',
          titular:'Ernesto React'
        },
        {
          id: 3,
          descripcion: 'Java',
          duracionHs: 260,
          fechaInicio: new Date("05/01/2023"),
          modalidad: 'Presencial',
          titular:'Peter Java'
        },
        {
          id: 4,
          descripcion: 'Go',
          duracionHs: 220,
          fechaInicio: new Date("06/15/2023"),
          modalidad: 'Distancia',
          titular:'David Go'
        }
      ]
  } */

  getCursoById(cursoId: number): CursoDto | undefined {
    let val: Array<CursoDto> = this.cursos.filter(alu => alu.id == cursoId);
    return (val.length > 0) ? val[0] : undefined;
  }

  getCursosList(): Observable<Array<CursoDto>> {
      return this.cursos$;
  }

  saveNewCurso(newCurso: CursoDto): void {
      this.httpServ.post<CursoDto>(this.url, newCurso, { headers: this.headers }).subscribe({
          next: data => {
              this.httpServ.get<CursoDto[]>(this.url).subscribe((cursos: CursoDto[]) => {
                  this.cursosSubject.next(cursos);
                  this.cursos = this.cursosSubject.getValue();
              });
          }, 
          error: err => {
            console.log(err);
          }
      });
  }

  updateCurso(updateCurso: CursoDto): boolean {
      let flag: boolean = false;
      let idx = this.cursos.findIndex(cur => cur.id == updateCurso.id);

      if(idx >= 0) {
          this.httpServ.put<CursoDto>(`${this.url}/${updateCurso.id}`, updateCurso).subscribe({
              next: data => {
                this.httpServ.get<CursoDto[]>(this.url).subscribe((cursos: CursoDto[]) => {
                    this.cursosSubject.next(cursos);
                    this.cursos = this.cursosSubject.getValue();
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

  deleteCurso(id: number): boolean {
      let flag: boolean = false; 
      let curDel = this.cursos.filter(cur => cur.id == id)[0];
      
      if(curDel) {
          this.httpServ.delete<CursoDto>(`${this.url}/${id}`, { headers: this.headers }).subscribe({
              next: data => {
                this.httpServ.get<CursoDto[]>(this.url).subscribe((cursos: CursoDto[]) => {
                    this.cursosSubject.next(cursos);
                    this.cursos = this.cursosSubject.getValue();
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
