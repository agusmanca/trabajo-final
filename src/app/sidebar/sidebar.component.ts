import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../commons/auth.guard';
import { UserRoleEnum } from '../commons/userRoleEnum';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private auth: AuthGuard) { }

  ngOnInit(): void {
  }

  isAuth(): boolean {
      if(this.auth.getRole() == UserRoleEnum.ADMIN.toString()) {
          return true;
      } else {
        return false;
      }
  }

  logout(): void {
    this.auth.logout()
  }
}
