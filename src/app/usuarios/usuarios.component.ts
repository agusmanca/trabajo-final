import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { refreshRegisterUser } from '../state/login/login.action';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit {

  constructor(private readonly store: Store<AppState>) { 
      this.store.dispatch(refreshRegisterUser());
  }

  ngOnInit(): void {
  }
}
