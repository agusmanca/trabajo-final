import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnoDto } from '../model/alumnoDto';
import { CalificacionesDto } from '../model/calidicaciones';
import { AlumnoServiceService } from '../service/alumno-service.service';

@Component({
  selector: 'app-abm-alumnos',
  templateUrl: './abm-alumnos.component.html',
  styleUrls: ['./abm-alumnos.component.css']
})
export class AbmAlumnosComponent implements OnInit {

  public mainForm!: FormGroup;  
  public alumnoId!: number;
  public alumno!: AlumnoDto;  
  public asignaturas: Array<string> = new Array();
  public txtBtnValue: string = 'Guardar';

  get calificacionesArray() {
    return this.mainForm.get('calificaciones') as FormArray;
  }

  constructor(public fb: FormBuilder, 
              public activeRouter: ActivatedRoute,
              public router: Router,
              public alumnoService: AlumnoServiceService) { 

      this.activeRouter.params.subscribe((param) => {
          this.alumnoId = param['id'];
      });          

      this.mainForm = fb.group({
          nombre: ['', [Validators.required, Validators.minLength(2)]],
          apellido: ['', [Validators.required, Validators.minLength(5)]],
          edad: ['', []],
          curso: ['', []],
          division: ['']
      }); 
  }

  ngOnInit(): void {
      this.alumno = this.alumnoService.getAlumnoById(this.alumnoId);
      this.asignaturas = this.alumnoService.getAsignaturasList();
      
      if(this.alumno){
          this.mainForm.get('nombre')?.setValue(this.alumno.nombre);
          this.mainForm.get('apellido')?.setValue(this.alumno.apellido);
          this.mainForm.get('edad')?.setValue(this.alumno.edad);
          this.mainForm.get('curso')?.setValue(this.alumno.curso);
          this.mainForm.get('division')?.setValue(this.alumno.division);

          this.txtBtnValue = 'Actualizar';
      }
  }

  submitProcess() {
      if(this.mainForm.invalid){
        return
      }
 
      if(this.alumno) {
          this.alumnoService.updateAlumno(this.setAlumnoValue(this.alumno.id));
          this.router.navigate(['/alumnos/lista-alumnos']);
      } else {
          this.alumnoService.saveNewAlumno(this.setAlumnoValue(0));
          this.router.navigate(['/alumnos/lista-alumnos']);
      }
  }

  setAlumnoValue(id: number): AlumnoDto {
    let caliArray: Array<CalificacionesDto> = new Array();
        
    return {
            id: id,
            nombre: this.mainForm.get('nombre')?.value,
            apellido: this.mainForm.get('apellido')?.value,
            edad: this.mainForm.get('edad')?.value,
            curso: this.mainForm.get('curso')?.value,
            division: this.mainForm.get('division')?.value,
            calificaciones: caliArray
          }
  }
}
