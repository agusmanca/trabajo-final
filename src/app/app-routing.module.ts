import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnosWrapperComponent } from './alumnos/alumnos-wrapper.component';
import { CursosWrapperComponent } from './cursos/cursos-wrapper.component';
import { LoginComponent } from './login/login.component';
import { MainContentComponent } from './main-content/main-content.component';

const routes: Routes = [
  { path: '', 
    component: MainContentComponent,
    children: [
      { path: 'alumnos', component: AlumnosWrapperComponent },
      { path: 'cursos',  component: CursosWrapperComponent }
    ] 
  },
  { path: 'login', component: LoginComponent },
  { path: '', pathMatch:'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
