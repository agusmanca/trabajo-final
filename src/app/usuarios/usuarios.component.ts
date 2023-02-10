import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../commons/auth.guard';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit {

  constructor(private auth: AuthGuard) { 
    auth.getRefresh();
  }

  ngOnInit(): void {
  }
}
