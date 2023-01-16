import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthGuard } from 'src/app/commons/auth.guard';
import { CursoDto } from '../model/CursoDto';
import { CursoService } from '../service/curso.service';

@Component({
  selector: 'app-abm-cursos',
  templateUrl: './abm-cursos.component.html',
  styleUrls: ['./abm-cursos.component.css']
})
export class AbmCursosComponent implements OnInit {

  public mainForm!: FormGroup;  
  public cursoId!: number;
  public curso!: CursoDto | undefined;
  public txtBtnValue: string = 'Guardar';

  get calificacionesArray() {
    return this.mainForm.get('calificaciones') as FormArray;
  }

  constructor(public fb: FormBuilder, 
              public activeRouter: ActivatedRoute,
              public router: Router,
              public authService: AuthGuard,
              public cursoService: CursoService) { 

      this.activeRouter.params.subscribe((param) => {
          this.cursoId = param['id'];
      });          

      this.mainForm = fb.group({
          descripcion: ['', [Validators.required, Validators.minLength(2)]],
          duracionHs: [''],
          fechaInicio: [''],
          modalidad: [''],
          titular: ['']
      }); 
  }

  ngOnInit(): void {
      this.curso = this.cursoService.getCursoById(this.cursoId);
      
      if(this.curso){
          this.mainForm.get('descripcion')?.setValue(this.curso.descripcion);
          this.mainForm.get('duracionHs')?.setValue(this.curso.duracionHs);
          this.mainForm.get('fechaInicio')?.setValue(this.curso.fechaInicio);
          this.mainForm.get('modalidad')?.setValue(this.curso.modalidad);
          this.mainForm.get('titular')?.setValue(this.curso.titular);
         
          this.txtBtnValue = 'Actualizar';
      }
  }

  submitProcess() {
      if(this.mainForm.invalid){
        return
      }
 
      if(this.curso) {
          this.cursoService.updateCurso(this.setCursoValue(this.curso.id));
          this.router.navigate(['/cursos/lista-cursos']);
      } else {
          this.cursoService.saveNewCurso(this.setCursoValue(0));
          this.router.navigate(['/cursos/lista-cursos']);
      }
  }

  setCursoValue(id: number): CursoDto {
    return {
            id: id,
            descripcion: this.mainForm.get('descripcion')?.value,
            duracionHs: this.mainForm.get('duracionHs')?.value,
            fechaInicio: this.mainForm.get('fechaInicio')?.value,
            modalidad: this.mainForm.get('modalidad')?.value,
            titular: this.mainForm.get('titular')?.value
          }
  }
}
