import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthGuard } from '../commons/auth.guard';
import { UserRoleEnum } from '../commons/userRoleEnum';
import { AppState } from '../state/app.state';
import { userSelect } from '../state/login/login.selector';
import { UserStateModel } from '../state/login/user.state.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  userModel!: UserStateModel | null;

  constructor(private auth: AuthGuard, public store: Store<AppState>) { 
      this.store.select(userSelect).subscribe((user: UserStateModel | null) => {
        this.userModel = user;
      });
  }

  ngOnInit(): void {
  }

  isAuth(): boolean {
      return (this.userModel?.role == UserRoleEnum.ADMIN);
  }

  logout(): void {
    this.auth.logout()
  }
}
