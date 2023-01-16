import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { AlumnoDto } from 'src/app/alumnos/model/alumnoDto';
import { AlumnoServiceService } from 'src/app/alumnos/service/alumno-service.service';
import { AuthGuard } from 'src/app/commons/auth.guard';
import { UserRoleEnum } from 'src/app/commons/userRoleEnum';
import { InscripcionDto } from 'src/app/inscripciones/model/InscripcionDto';
import { InscripcionService } from 'src/app/inscripciones/services/inscripcion.service';
import { environment } from 'src/environments/environment';
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
  addBtnTxt: string = "Agregar nuevo Alumno";
  alumnoSelected: number = 0;

  constructor(public activeRouter: ActivatedRoute, 
              public incripcionService: InscripcionService,
              public cursosService: CursoService,
              public authService: AuthGuard,
              public alumnoService: AlumnoServiceService) {
    
    this.activeRouter.params.subscribe((param) => {
        this.cursoId = param['id'];
        this.curso = this.cursosService.getCursoById(this.cursoId);
    });
  }

  ngOnInit(): void {
      if(this.curso) {
          this.setInscripciones();
      }
  }

  inscribir(idCurso: number, idAlumno: number): void {
      this.incripcionService.inscribirACurso(idCurso, idAlumno);
      this.setInscripciones();
  }

  desinscribir(idCurso: number, idAlumno: number): void {
      this.incripcionService.desinscribirACurso(idCurso, idAlumno);
      this.setInscripciones();
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


  getAlumnosNoInscriptos(): Array<AlumnoDto> {
       let alumnosNoInsc = this.alumnoService.getAlumnosList();
       this.alumnos.forEach(ai => {
            alumnosNoInsc = alumnosNoInsc.filter(a => a.id !== ai.id);
       });
       return alumnosNoInsc;
  }

  inscribirAlumno() {

    if(this.curso && this.alumnoSelected > 0) {
        this.incripcionService.inscribirACurso(this.curso.id, this.alumnoSelected);
        this.setInscripciones();
    }
    this.flagNewAlumno = false;
  }

  isAuth(): boolean {
    if(this.authService.getRole() == UserRoleEnum.ADMIN){
      return true;
    } else {
      return false;
    }
  }
}

