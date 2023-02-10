import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthGuard } from 'src/app/commons/auth.guard';
import { UserRoleEnum } from 'src/app/commons/userRoleEnum';
import { InscripcionService } from 'src/app/inscripciones/services/inscripcion.service';
import { AppState } from 'src/app/state/app.state';
import { userSelect } from 'src/app/state/login/login.selector';
import { UserStateModel } from 'src/app/state/login/user.state.model';
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
  userModel!: UserStateModel | null;

  constructor(public alumnosService: AlumnoServiceService,
              public inscripcionesService: InscripcionService,
              public store: Store<AppState>,
              public router: Router) { 
    
    this.store.select(userSelect).subscribe((user: UserStateModel | null) => {
      this.userModel = user;
    });

    this.alumnosService.getAlumnosList().subscribe((alusP: Array<AlumnoDto>) => {
      this.alumnos = alusP;
    });
  }

  ngOnInit(): void {}

  eliminarAlumno(id: number) {
      this.alumnosService.deleteAlumno(id);
      this.inscripcionesService.eliminarInscirpcionPorAlumnoEliminado(id);  
      this.alumnosService.getAlumnosList().subscribe((alusP: Array<AlumnoDto>) => {
        this.alumnos = alusP;
      });
  }

  actualizarAlumno(id: number) {
      this.router.navigate(['alumnos','abm-alumno', id]);
  }

  crearAlumno() {
      this.router.navigate(['alumnos','abm-alumno', 0]);
  }

  isAuth(): boolean {
      return (this.userModel?.role == UserRoleEnum.ADMIN);
  }
}
