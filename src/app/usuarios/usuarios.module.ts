import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { UsuariosComponent } from './usuarios.component';
import { SharedModule } from '../shared.module';
import { RouterModule, Routes } from '@angular/router';
import { AbmUsuariosComponent } from './abm-usuarios/abm-usuarios.component';
import { DetalleUsuariosComponent } from './detalle-usuarios/detalle-usuarios.component';
import { RolePipe } from '../commons/role.pipe';
import { AuthGuard } from '../commons/auth.guard';

const routes: Routes = [
  { 
    path: 'usuarios', 
    component: UsuariosComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ListaUsuariosComponent },
      { path: 'lista-usuarios', component: ListaUsuariosComponent },
      { path: 'abm-usuarios/:id', component: AbmUsuariosComponent },
      { path: 'detalle-usuarios/:id', component: DetalleUsuariosComponent },
    ]
  },
  { path: '', pathMatch:'full', redirectTo: '' }
]

@NgModule({
  declarations: [
    UsuariosComponent,
    ListaUsuariosComponent,
    AbmUsuariosComponent,
    DetalleUsuariosComponent,
    RolePipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UsuariosModule { }
