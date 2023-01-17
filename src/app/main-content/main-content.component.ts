import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../commons/auth.guard';
import { UsuarioDto } from '../usuarios/model/usuarioDto';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {

  usuario: UsuarioDto | undefined;

  constructor(private auth: AuthGuard) { 
      this.usuario = this.auth.getUser();
  }

  ngOnInit(): void {
  }

}
