import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../commons/auth.guard';

@Component({
  selector: 'app-alumnos-wrapper',
  templateUrl: './cursos-wrapper.component.html'
})
export class CursosWrapperComponent implements OnInit {

  constructor(private readonly auth: AuthGuard) { 
    auth.getRefresh();
  }

  ngOnInit(): void {
  }

}
