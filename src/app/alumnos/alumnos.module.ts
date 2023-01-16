import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlumnosWrapperComponent } from './alumnos-wrapper.component';
import { AbmAlumnosComponent } from './abm-alumnos/abm-alumnos.component';
import { ListaAlumnosComponent } from './lista-alumnos/lista-alumnos.component';
import { DetalleAlumnosComponent } from './detalle-alumnos/detalle-alumnos.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared.module';
import { AuthGuard } from '../commons/auth.guard';

const routes: Routes = [
  { 
    path: 'alumnos', 
    component: AlumnosWrapperComponent,
    children: [
      { path: '', component: ListaAlumnosComponent },
      { path: 'lista-alumnos', component: ListaAlumnosComponent },
      { path: 'abm-alumno/:id', component: AbmAlumnosComponent, canActivate:[AuthGuard] },
      { path: 'detalle-alumno/:id', component: DetalleAlumnosComponent }
    ]
  },
  { path: '', pathMatch:'full', redirectTo: '/alumnos/lista-alumnos' }
]

@NgModule({
  declarations: [
    AlumnosWrapperComponent, 
    ListaAlumnosComponent,
    AbmAlumnosComponent,
    DetalleAlumnosComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AlumnosModule { }
