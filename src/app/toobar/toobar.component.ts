import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthGuard } from '../commons/auth.guard';
import { AppState } from '../state/app.state';
import { userSelect } from '../state/login/login.selector';
import { UserStateModel } from '../state/login/user.state.model';
import { UsuarioDto } from '../usuarios/model/usuarioDto';

@Component({
  selector: 'app-toobar',
  templateUrl: './toobar.component.html',
  styleUrls: ['./toobar.component.css']
})
export class ToobarComponent implements OnInit {

  usuario!: UserStateModel | null;

  constructor(public store: Store<AppState>) { 
    this.store.select(userSelect).subscribe((user: UserStateModel | null) => {
      this.usuario = user;
    });
  }

  ngOnInit(): void {}
}
