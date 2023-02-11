import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { refreshRegisterUser } from '../state/login/login.action';

@Component({
  selector: 'app-alumnos-wrapper',
  templateUrl: './alumnos-wrapper.component.html'
})
export class AlumnosWrapperComponent implements OnInit {

  constructor(private readonly store: Store<AppState>) { 
      this.store.dispatch(refreshRegisterUser());
  }

  ngOnInit(): void { }
}
