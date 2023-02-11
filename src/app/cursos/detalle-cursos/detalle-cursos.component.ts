import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, of } from 'rxjs';
import { AlumnoDto } from 'src/app/alumnos/model/alumnoDto';
import { AlumnoServiceService } from 'src/app/alumnos/service/alumno-service.service';
import { UserRoleEnum } from 'src/app/commons/userRoleEnum';
import { InscripcionDto } from 'src/app/inscripciones/model/InscripcionDto';
import { InscripcionService } from 'src/app/inscripciones/services/inscripcion.service';
import { AppState } from 'src/app/state/app.state';
import { userSelect } from 'src/app/state/login/login.selector';
import { UserStateModel } from 'src/app/state/login/user.state.model';
import { CursoDto } from '../model/CursoDto';
import { CursoService } from '../service/curso.service';

@Component({
  selector: 'app-detalle-cursos',
  templateUrl: './detalle-cursos.component.html',
  styleUrls: ['./detalle-cursos.component.css']
})
export class DetalleCursosComponent implements OnInit {

  alumnos: Array<AlumnoDto> = new Array();
  inscripciones: Array<InscripcionDto> = new Array();
  cursoId!: number;
  curso: CursoDto | undefined;
  flagNewAlumno: boolean = false;
  addBtnTxt: string = "Inscribir nuevo Alumno";
  alumnoSelected: number = 0;
  userModel!: UserStateModel | null;
  
  constructor(public activeRouter: ActivatedRoute, 
              public incripcionService: InscripcionService,
              public cursosService: CursoService,
              public store: Store<AppState>,
              public alumnoService: AlumnoServiceService) {
    
    this.activeRouter.params.subscribe((param) => {
        this.cursoId = param['id'];
        this.curso = this.cursosService.getCursoById(this.cursoId);
    });

    this.store.select(userSelect).subscribe((user: UserStateModel | null) => {
      this.userModel = user;
    }); 
  }

  ngOnInit(): void {
      if(this.curso) {
          this.setInscripciones();
      }
  }

  inscribirAlumno() {
    if(this.curso && this.alumnoSelected > 0) {
        this.incripcionService.inscribirACurso(this.curso.id, this.alumnoSelected).then(() => { 
            this.setInscripciones();
        });
    }
    this.flagNewAlumno = false;
  }

  desinscribir(idCurso: number, idAlumno: number): void {
      this.incripcionService.desinscribirACurso(idCurso, idAlumno).then((res: boolean) => {
          this.setInscripciones();
      });
  }

  setInscripciones(): void {
      this.alumnos = [];  
      this.incripcionService.getAlumnosPorCurso(this.cursoId).subscribe(insc => {
          if(insc) {
              this.inscripciones = insc;
              insc.forEach(i => {
                this.alumnos.push(this.alumnoService.getAlumnoById(i.idAlumno))
              });
          }
      });
  }

  showAddAlumnoForm() {
      this.flagNewAlumno = !this.flagNewAlumno;
      if(this.flagNewAlumno) {
          this.addBtnTxt= "Agregar nuevo Alumno";
      } else {
        this.addBtnTxt = "Cancelar nuevo alumno";
      }
  }

  getAlumnosNoInscriptos(): Observable<Array<AlumnoDto>> {
      return this.alumnoService.getAlumnosList().pipe(
          map((alusLst: Array<AlumnoDto>) => {
              let lista = alusLst;
              this.alumnos.forEach(ai => {
                lista = lista.filter(a => a.id !== ai.id);
              });
              return lista;
          }
      ));
  }

  isAuth(): boolean {
    return (this.userModel?.role == UserRoleEnum.ADMIN);
  }
}

