import { Injectable } from '@angular/core';
import { InscripcionService } from 'src/app/inscripciones/services/inscripcion.service';
import { CursoDto } from '../model/CursoDto';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  cursos: Array<CursoDto> = new Array();

  constructor() { 
    this.cursos = this.setCursosMock();
  }

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
  }

  getCursoById(cursoId: number): CursoDto | undefined {
    let val: Array<CursoDto> = this.cursos.filter(alu => alu.id == cursoId);
    return (val.length > 0) ? val[0] : undefined;
  }

  getCursosList(): Array<CursoDto> {
      return this.cursos;
  }

  saveNewCurso(newCurso: CursoDto): void {
    newCurso.id = this.cursos.length + 1;
    this.cursos = [...this.cursos, newCurso];
  }

  updateCurso(updateCurso: CursoDto): boolean {
      let flag: boolean = false;
      let idx = this.cursos.findIndex(cur => cur.id == updateCurso.id);

      if(idx >= 0) {
        this.cursos[idx] = updateCurso;
        flag = true;
      }
      return flag;
  }

  deleteCurso(id: number): boolean {
      let flag: boolean = false; 
      let curDel = this.cursos.filter(cur => cur.id == id)[0];
      
      if(curDel) {        
        this.cursos = this.cursos.filter(cur => cur.id !== id);       
        flag = true;
      }
      return flag;
  }
}
