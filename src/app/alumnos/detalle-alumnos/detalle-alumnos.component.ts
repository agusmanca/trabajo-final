import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthGuard } from 'src/app/commons/auth.guard';
import { UserRoleEnum } from 'src/app/commons/userRoleEnum';
import { CursoDto } from 'src/app/cursos/model/CursoDto';
import { CursoService } from 'src/app/cursos/service/curso.service';
import { InscripcionDto } from 'src/app/inscripciones/model/InscripcionDto';
import { InscripcionService } from 'src/app/inscripciones/services/inscripcion.service';
import { environment } from 'src/environments/environment';
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

  constructor(public activeRouter: ActivatedRoute, 
              public incripcionService: InscripcionService,
              public cursosService: CursoService,
              public authService: AuthGuard,
              public alumnoService: AlumnoServiceService) {
    
    this.activeRouter.params.subscribe((param) => {
        this.alumnoId = param['id'];
        this.alumno = this.alumnoService.getAlumnoById(this.alumnoId);
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
      if(this.authService.getRole() != UserRoleEnum.ADMIN.toString()){
        return
      }

      this.incripcionService.inscribirACurso(idCurso, idAlumno);
      this.setInscripciones();
  }

  desinscribir(idCurso: number, idAlumno: number): void {
      if(this.authService.getRole() != UserRoleEnum.ADMIN.toString()){
        return
      }
      
      this.incripcionService.desinscribirACurso(idCurso, idAlumno);
      this.setInscripciones();
  }

  setInscripciones(): void {
    this.incripcionService.getCursosPorAlumno(this.alumnoId).subscribe((ins: Array<InscripcionDto>) => {
        this.inscripciones = ins;
    });
  }
}
