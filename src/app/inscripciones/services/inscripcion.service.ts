import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AlumnoDto } from 'src/app/alumnos/model/alumnoDto';
import { AlumnoServiceService } from 'src/app/alumnos/service/alumno-service.service';
import { CursoService } from 'src/app/cursos/service/curso.service';
import { InscripcionDto } from '../model/InscripcionDto';

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {

  inscripciones: Array<InscripcionDto> = new Array();

  constructor(public cursoService: CursoService, 
              public alumnoServiceService: AlumnoServiceService) 
  { 
      this.setMockInscripcion();
  }

  setMockInscripcion(): void {
      this.inscripciones = [
        {id: 1, idAlumno: 1, descAlumno: '', idCurso: 1, descCurso: '', fechaInscripcion: new Date("02/10/2023")},
        {id: 2, idAlumno: 1, descAlumno: '', idCurso: 2, descCurso: '', fechaInscripcion: new Date("01/15/2023")},
        {id: 3, idAlumno: 2, descAlumno: '', idCurso: 3, descCurso: '', fechaInscripcion: new Date("01/18/2023")},
        {id: 4, idAlumno: 2, descAlumno: '', idCurso: 4, descCurso: '', fechaInscripcion: new Date("12/23/2023")},
        {id: 5, idAlumno: 3, descAlumno: '', idCurso: 1, descCurso: '', fechaInscripcion: new Date("03/01/2023")}
      ]
  }

  getCursosPorAlumno(idAlumno: number): Observable<Array<InscripcionDto>> {
    return of(this.inscripciones.filter(ins => ins.idAlumno == idAlumno));
  }

  getAlumnosPorCurso(idCurso: number): Observable<Array<InscripcionDto>> {
    return of(this.inscripciones.filter(ins => ins.idCurso == idCurso));
  }

  inscribirACurso(idCurso: number, idAlumno: number): void {
    let ctrl = this.inscripciones.filter(insc => insc.idAlumno == idAlumno && insc.idCurso == idCurso);  
    if(!ctrl){
      return
    }
    this.inscripciones = [...this.inscripciones, {id: this.inscripciones.length + 1, idAlumno: idAlumno, descAlumno: '', idCurso: idCurso, descCurso: '', fechaInscripcion: new Date()}]
  }

  desinscribirACurso(idCurso: number, idAlumno: number): void {
    let daleteInsc = this.inscripciones.filter(insc => insc.idAlumno == idAlumno && insc.idCurso == idCurso)[0];
    
    if(daleteInsc) {        
      this.inscripciones = this.inscripciones.filter(insc => insc.id !== daleteInsc.id);       
    }
  }

  eliminarInscirpcionPorAlumnoEliminado(idAlumno: number) {
    this.inscripciones = this.inscripciones.filter(insc => insc.idAlumno !== idAlumno);
  }

  eliminarInscirpcionPorCursoEliminado(idCurso: number) {
    this.inscripciones = this.inscripciones.filter(insc => insc.idCurso !== idCurso);
  }
}
