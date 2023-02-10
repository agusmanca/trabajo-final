import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthGuard } from '../commons/auth.guard';
import { AppState } from '../state/app.state';
import { userSelect } from '../state/login/login.selector';
import { UserStateModel } from '../state/login/user.state.model';
import { UsuarioDto } from '../usuarios/model/usuarioDto';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {

  usuario!: UserStateModel | null;

  constructor(private auth: AuthGuard, public store: Store<AppState>,) { 

      this.auth.getRefresh();

      this.store.select(userSelect).subscribe((user: UserStateModel | null) => {
          this.usuario = user;
      });  
  }

  ngOnInit(): void {
  }
}
