import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../commons/auth.guard';
import { UsuarioDto } from '../usuarios/model/usuarioDto';

@Component({
  selector: 'app-toobar',
  templateUrl: './toobar.component.html',
  styleUrls: ['./toobar.component.css']
})
export class ToobarComponent implements OnInit {

  usuario: UsuarioDto | undefined;

  constructor(private auth: AuthGuard) { 
      this.usuario = this.auth.getUser();
  }

  ngOnInit(): void {
  }

}
