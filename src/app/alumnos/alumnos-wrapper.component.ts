import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../commons/auth.guard';

@Component({
  selector: 'app-alumnos-wrapper',
  templateUrl: './alumnos-wrapper.component.html'
})
export class AlumnosWrapperComponent implements OnInit {

  constructor(private readonly auth: AuthGuard) { 
    auth.getRefresh();
  }

  ngOnInit(): void { }
}
