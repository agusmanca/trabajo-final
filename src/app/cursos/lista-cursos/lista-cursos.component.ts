import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthGuard } from 'src/app/commons/auth.guard';
import { UserRoleEnum } from 'src/app/commons/userRoleEnum';
import { InscripcionService } from 'src/app/inscripciones/services/inscripcion.service';
import { environment } from 'src/environments/environment';
import { CursoDto } from '../model/CursoDto';
import { CursoService } from '../service/curso.service';

@Component({
  selector: 'app-lista-cursos',
  templateUrl: './lista-cursos.component.html',
  styleUrls: ['./lista-cursos.component.css']
})
export class ListaCursosComponent implements OnInit {

  cursos$!: Observable<Array<CursoDto>>;
  cursos: Array<CursoDto> = new Array();
  columnsName: string[] = ['descripcion', 'duracionHs', 'fechaInicio', 'modalidad', 'titular', 'actualizar', 'eliminar', 'detalle'];

  constructor(public cursosService: CursoService, 
              public inscripcionService: InscripcionService,
              public authService: AuthGuard,
              public router: Router) {


    this.cursos$ = this.cursosService.getCursosList();

    this.cursosService.getCursosList().subscribe((cursosP: Array<CursoDto>) => {
        this.cursos = cursosP;
    });
  }

  ngOnInit(): void {
  }

  eliminarCurso(id: number) {
    this.cursosService.deleteCurso(id);
    this.inscripcionService.eliminarInscirpcionPorCursoEliminado(id);
    this.cursosService.getCursosList().subscribe((cursosP: Array<CursoDto>) => {
      this.cursos = cursosP;
    }); 
  }

  actualizarCurso(id: number) {
      this.router.navigate(['cursos', 'abm-curso', id]);
  }

  crearCurso() {
      this.router.navigate(['cursos', 'abm-curso', 0]);
  }

  isAuth(): boolean {
    if(this.authService.getRole() == UserRoleEnum.ADMIN.toString()){
      return true;
    } else {
      return false;
    }
  }
}
