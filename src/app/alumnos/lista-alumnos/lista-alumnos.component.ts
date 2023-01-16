import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/commons/auth.guard';
import { UserRoleEnum } from 'src/app/commons/userRoleEnum';
import { InscripcionDto } from 'src/app/inscripciones/model/InscripcionDto';
import { InscripcionService } from 'src/app/inscripciones/services/inscripcion.service';
import { environment } from 'src/environments/environment';
import { AlumnoDto } from '../model/alumnoDto';
import { AlumnoServiceService } from '../service/alumno-service.service';

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.css']
})
export class ListaAlumnosComponent implements OnInit {

  alumnos: Array<AlumnoDto> = new Array();
  columnsName: string[] = ['nombre', 'edad', 'division', 'actualizar', 'eliminar', 'detalle'];

  constructor(public alumnosService: AlumnoServiceService,
              public inscripcionesService: InscripcionService,
              public authService: AuthGuard,
              public router: Router) { 
    this.alumnos = this.alumnosService.getAlumnosList();
  }

  ngOnInit(): void {
  }

  eliminarAlumno(id: number) {
      this.alumnosService.deleteAlumno(id);
      this.inscripcionesService.eliminarInscirpcionPorAlumnoEliminado(id);  
      this.alumnos = this.alumnosService.getAlumnosList();
  }

  actualizarAlumno(id: number) {
      this.router.navigate(['alumnos','abm-alumno', id]);
  }

  crearAlumno() {
      this.router.navigate(['alumnos','abm-alumno', 0]);
  }

  isAuth(): boolean {
      if(this.authService.getRole() == UserRoleEnum.ADMIN){
        return true;
      } else {
        return false;
      }
  }
}
