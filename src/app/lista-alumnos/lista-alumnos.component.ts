import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlumnoDto } from './model/alumnoDto';
import { AlumnoServiceService } from './service/alumno-service.service';

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.css']
})
export class ListaAlumnosComponent implements OnInit {

  alumnos: Array<AlumnoDto> = new Array();
  columnsName: string[] = ['nombre', 'edad', 'curso', 'lengua', 'matematica', 'geografia', 'musica', 'eliminar', 'actualizar'];

  constructor(public alumnosService: AlumnoServiceService, public router: Router) { 
    this.alumnos = this.alumnosService.getAlumnosList();
  }

  ngOnInit(): void {  
  }

  eliminarAlumno(id: number) {
      this.alumnosService.deleteAlumno(id);
      this.alumnos = this.alumnosService.getAlumnosList();
  }

  actualizarAlumno(id: number) {
      this.router.navigate(['abm-alumno', id]);
  }

  crearAlumno() {
      this.router.navigate(['abm-alumno', 0]);
  }
}
