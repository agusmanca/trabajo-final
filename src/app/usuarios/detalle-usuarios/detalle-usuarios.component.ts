import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioDto } from '../model/usuarioDto';
import { UsuariosService } from '../servicios/usuarios.service';

@Component({
  selector: 'app-detalle-usuarios',
  templateUrl: './detalle-usuarios.component.html',
  styleUrls: ['./detalle-usuarios.component.css']
})
export class DetalleUsuariosComponent implements OnInit {

  usuarioId!: number;
  usuario!: UsuarioDto | undefined;

  constructor(public activeRouter: ActivatedRoute,
              public usuarioService: UsuariosService) {
    
    this.activeRouter.params.subscribe((param) => {
        this.usuarioId = param['id'];
        this.usuario = this.usuarioService.getUsuarioById(this.usuarioId);
    }); 
  }

  ngOnInit(): void {

  }
}
