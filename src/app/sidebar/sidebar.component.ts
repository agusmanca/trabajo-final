import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../commons/auth.guard';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private auth: AuthGuard) { }

  ngOnInit(): void {
  }

  logout() {
    this.auth.logout()
  }
}
