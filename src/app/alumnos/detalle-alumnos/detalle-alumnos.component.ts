import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthGuard } from 'src/app/commons/auth.guard';
import { UserRoleEnum } from 'src/app/commons/userRoleEnum';
import { CursoDto } from 'src/app/cursos/model/CursoDto';
import { CursoService } from 'src/app/cursos/service/curso.service';
import { InscripcionDto } from 'src/app/inscripciones/model/InscripcionDto';
import { InscripcionService } from 'src/app/inscripciones/services/inscripcion.service';
import { AppState } from 'src/app/state/app.state';
import { userSelect } from 'src/app/state/login/login.selector';
import { UserStateModel } from 'src/app/state/login/user.state.model';
import { AlumnoDto } from '../model/alumnoDto';
import { AlumnoServiceService } from '../service/alumno-service.service';

@Component({
  selector: 'app-detalle-alumnos',
  templateUrl: './detalle-alumnos.component.html',
  styleUrls: ['./detalle-alumnos.component.css']
})
export class DetalleAlumnosComponent implements OnInit {

  cursosAlumno: Array<CursoDto> = new Array();
  inscripciones: Array<InscripcionDto> = new Array();
  alumnoId!: number;
  alumno!: AlumnoDto;
  userModel!: UserStateModel | null;

  constructor(public activeRouter: ActivatedRoute, 
              public incripcionService: InscripcionService,
              public cursosService: CursoService,
              public store: Store<AppState>,
              public alumnoService: AlumnoServiceService) {
    
    this.activeRouter.params.subscribe((param) => {
        this.alumnoId = param['id'];
        this.alumno = this.alumnoService.getAlumnoById(this.alumnoId);
    }); 

    this.store.select(userSelect).subscribe((user: UserStateModel | null) => {
      this.userModel = user;
    });
  }

  ngOnInit(): void {
    if(this.alumno) {
        this.cursosService.getCursosList().subscribe((cursosP: Array<CursoDto>) => {
          this.cursosAlumno = cursosP;
        });
        this.setInscripciones();
    }
  }

  estaInscripto(idCurso: number): boolean {
      let flag = false;
      this.inscripciones.forEach((insc) => {
        if(insc.idCurso == idCurso){
          flag = true
        }
      });
      return flag;
  }

  inscribir(idCurso: number, idAlumno: number): void {
      if(this.userModel?.role != UserRoleEnum.ADMIN){
        return
      }

      this.incripcionService.inscribirACurso(idCurso, idAlumno).then((res: boolean) => {
          this.setInscripciones();
      });
  }

  desinscribir(idCurso: number, idAlumno: number): void {
      if(this.userModel?.role != UserRoleEnum.ADMIN){
        return
      }
      
      this.incripcionService.desinscribirACurso(idCurso, idAlumno).then((res: boolean) => {
          this.setInscripciones();
      });
  }

  setInscripciones(): void {
    this.incripcionService.getCursosPorAlumno(this.alumnoId).subscribe((ins: Array<InscripcionDto>) => {
        this.inscripciones = ins;
    });
  }
}
