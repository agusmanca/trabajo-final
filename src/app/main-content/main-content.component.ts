import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { refreshRegisterUser } from '../state/login/login.action';
import { userSelect } from '../state/login/login.selector';
import { UserStateModel } from '../state/login/user.state.model';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {

  usuario!: UserStateModel | null;

  constructor(public store: Store<AppState>,) { 
      this.store.dispatch(refreshRegisterUser());

      this.store.select(userSelect).subscribe((user: UserStateModel | null) => {
          this.usuario = user;
      });  
  }

  ngOnInit(): void {
  }
}
