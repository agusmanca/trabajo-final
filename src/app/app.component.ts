import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from './state/app.state';
import { refreshRegisterUser, verifySessionState } from './state/login/login.action';
import { userLoginState } from './state/login/login.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  title = 'final-manca';

  constructor(private readonly store: Store<AppState>) { 
      this.store.dispatch(refreshRegisterUser());
      this.store.dispatch(verifySessionState());
  }

  isAuth(): Observable<boolean> {
    return this.store.select(userLoginState);
  }
}
