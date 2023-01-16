import { Component } from '@angular/core';
import { AuthGuard } from './commons/auth.guard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  constructor(public authServ: AuthGuard) {
    
  }

  title = 'final-manca';
}
