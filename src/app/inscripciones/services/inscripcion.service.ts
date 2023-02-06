import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AlumnoServiceService } from 'src/app/alumnos/service/alumno-service.service';
import { CursoService } from 'src/app/cursos/service/curso.service';
import { environment } from 'src/environments/environment';
import { InscripcionDto } from '../model/InscripcionDto';

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {

  private inscripciones$!: Observable<InscripcionDto[]>;
  private inscripcionesSubject: BehaviorSubject<InscripcionDto[]> = new BehaviorSubject<InscripcionDto[]>([]) ;
  public  inscripciones: Array<InscripcionDto> = new Array();

  private url:string = environment.mockApiUrl2 + 'inscripciones';
  private headers: HttpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});

  constructor(public cursoService: CursoService, 
              public httpService: HttpClient,
              public alumnoServiceService: AlumnoServiceService) 
  { 
      this.inscripciones$ = this.inscripcionesSubject.asObservable();
      
      this.httpService.get<Array<InscripcionDto>>(this.url).subscribe((insc: Array<InscripcionDto>) => {
          this.inscripcionesSubject.next(insc);
          this.inscripciones = this.inscripcionesSubject.getValue();
      });
  }

  /*  setMockInscripcion(): void {
      this.inscripciones = [
        {id: 1, idAlumno: 1, descAlumno: '', idCurso: 1, descCurso: '', fechaInscripcion: new Date("02/10/2023")},
        {id: 2, idAlumno: 1, descAlumno: '', idCurso: 2, descCurso: '', fechaInscripcion: new Date("01/15/2023")},
        {id: 3, idAlumno: 2, descAlumno: '', idCurso: 3, descCurso: '', fechaInscripcion: new Date("01/18/2023")},
        {id: 4, idAlumno: 2, descAlumno: '', idCurso: 4, descCurso: '', fechaInscripcion: new Date("12/23/2023")},
        {id: 5, idAlumno: 3, descAlumno: '', idCurso: 1, descCurso: '', fechaInscripcion: new Date("03/01/2023")}
      ]
  } */

  getCursosPorAlumno(idAlumno: number): Observable<Array<InscripcionDto>> {
    return of(this.inscripciones.filter(ins => ins.idAlumno == idAlumno));
  }

  getAlumnosPorCurso(idCurso: number): Observable<Array<InscripcionDto>> {
    return of(this.inscripciones.filter(ins => ins.idCurso == idCurso));
  }

  inscribirACurso(idCurso: number, idAlumno: number): Promise<boolean> {

      return new Promise((resolve) => {
          let ctrl: InscripcionDto = this.inscripciones.filter(insc => insc.idAlumno == idAlumno && insc.idCurso == idCurso)[0];  

          if(ctrl){
            return
          }
    
          let inscBody: InscripcionDto = {id: this.inscripciones.length + 1, idAlumno: idAlumno, descAlumno: '', idCurso: idCurso, descCurso: '', fechaInscripcion: new Date()};
    
          this.httpService.post<InscripcionDto>(this.url, inscBody, { headers: this.headers }).subscribe({
              next: data => {
                this.httpService.get<Array<InscripcionDto>>(this.url).subscribe((insc: Array<InscripcionDto>) => {
                    this.inscripcionesSubject.next(insc);
                    this.inscripciones = this.inscripcionesSubject.getValue();
                    resolve(true);
                });
              }, 
              error: err => {
                console.log(err);
                resolve(false);
              }
          });
      });
  }

  desinscribirACurso(idCurso: number, idAlumno: number): Promise<boolean> {
      return new Promise((resolve) => {
          let ctrl: InscripcionDto = this.inscripciones.filter(insc => insc.idAlumno == idAlumno && insc.idCurso == idCurso)[0];  
          
          if(!ctrl){
            console.log("El registro no existe.");
            return
          }

          this.httpService.delete<InscripcionDto>(`${this.url}/${ctrl.id}`, { headers: this.headers }).subscribe({
              next: data => {
                this.httpService.get<Array<InscripcionDto>>(this.url).subscribe((insc: Array<InscripcionDto>) => {
                    this.inscripcionesSubject.next(insc);
                    this.inscripciones = this.inscripcionesSubject.getValue();
                    resolve(true);
                });
              }, 
              error: err => {
                console.log(err);
                resolve(false);
              }
          });
      });
  }

  async eliminarInscirpcionPorAlumnoEliminado(idAlumno: number) {
  
    let idList: Array<number> = this.inscripciones.filter(insc => insc.idAlumno == idAlumno).map(reg => reg.id);

    if(!idList || idList.length == 0) {
      console.log("No se encontraron registros a eliminar");
      return 
    }

    await this.eliminarListaRegistros(idList).then((res: Array<number>) => {
      if(res.length == 0){
          return true;
      } else {
          console.log("Ocurrio un error al eliminar registros. Los registros no eliminados son: " + res);
          return false;
        }
    });
  }

  async eliminarInscirpcionPorCursoEliminado(idCurso: number) {
      let idList: Array<number> = this.inscripciones.filter(insc => insc.idCurso == idCurso).map(reg => reg.id);

      if(!idList || idList.length == 0) {
        console.log("No se encontraron registros a eliminar");
        return 
      }

      await this.eliminarListaRegistros(idList).then((res: Array<number>) => {
          if(res.length == 0){
              return true;
          } else {
              console.log("Ocurrio un error al eliminar registros. Los registros no eliminados son: " + res);
              return false;
          }
      });
  }

  async eliminarListaRegistros(idList: Array<number>): Promise<Array<number>> {
      let undeletedReg: Array<number> = [];

      idList.forEach(async (id: number) => {
          await this.eliminarReg(id).then((res: boolean) => {
              if(!res){
                undeletedReg.push(id);
                console.log(`La inscripcion id: ${id} no se pudo elimnar`);
              }
          });
      });

      return undeletedReg;
  }

  eliminarReg(id: number): Promise<boolean> {
      return new Promise((resolve, reject) => {
          this.httpService.delete<InscripcionDto>(`${this.url}/${id}`, { headers: this.headers }).subscribe({
              next: data => {
                resolve(true);
              }, 
              error: err => {
                resolve(false);
              }
          });
      });
  }
}
