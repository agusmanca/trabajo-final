import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  cursos: Array<CursoDto> = new Array();
  columnsName: string[] = ['descripcion', 'duracionHs', 'fechaInicio', 'modalidad', 'titular', 'actualizar', 'eliminar', 'detalle'];

  constructor(public cursosService: CursoService, 
              public inscripcionService: InscripcionService,
              public authService: AuthGuard,
              public router: Router) { 
    this.cursos = this.cursosService.getCursosList();
  }

  ngOnInit(): void {
  }

  eliminarCurso(id: number) {
    this.cursosService.deleteCurso(id);
    this.inscripcionService.eliminarInscirpcionPorCursoEliminado(id);
    this.cursos = this.cursosService.getCursosList();   
  }

  actualizarCurso(id: number) {
      this.router.navigate(['cursos', 'abm-curso', id]);
  }

  crearCurso() {
      this.router.navigate(['cursos', 'abm-curso', 0]);
  }

  isAuth(): boolean {
    if(this.authService.getRole() == UserRoleEnum.ADMIN){
      return true;
    } else {
      return false;
    }
  }
}
