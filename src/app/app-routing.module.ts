import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbmAlumnosComponent } from './abm-alumnos/abm-alumnos.component';
import { ListaAlumnosComponent } from './lista-alumnos/lista-alumnos.component';

const routes: Routes = [
  { path: '', component: ListaAlumnosComponent},
  { path: 'lista-alumnos', component: ListaAlumnosComponent},
  { path: 'abm-alumno/:id', component: AbmAlumnosComponent},
  { path: '', pathMatch:'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
