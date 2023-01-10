import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbmAlumnosComponent } from './alumnos/abm-alumnos/abm-alumnos.component';
import { DetalleAlumnosComponent } from './alumnos/detalle-alumnos/detalle-alumnos.component';
import { ListaAlumnosComponent } from './alumnos/lista-alumnos/lista-alumnos.component';
import { AuthGuard } from './commons/auth.guard';
import { AbmCursosComponent } from './cursos/abm-cursos/abm-cursos.component';
import { DetalleCursosComponent } from './cursos/detalle-cursos/detalle-cursos.component';
import { ListaCursosComponent } from './cursos/lista-cursos/lista-cursos.component';
import { MainContentComponent } from './main-content/main-content.component';

const routes: Routes = [
  { path: '', component: MainContentComponent},
  { path: 'lista-alumnos', component: ListaAlumnosComponent},
  { path: 'abm-alumno/:id', component: AbmAlumnosComponent, canActivate: [AuthGuard]},
  { path: 'detalle-alumno/:id', component: DetalleAlumnosComponent},
  { path: 'lista-cursos', component: ListaCursosComponent},
  { path: 'abm-curso/:id', component: AbmCursosComponent, canActivate: [AuthGuard]},
  { path: 'detalle-curso/:id', component: DetalleCursosComponent},
  { path: '', pathMatch:'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
