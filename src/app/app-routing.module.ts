import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainContentComponent } from './main-content/main-content.component';

const routes: Routes = [
  { path: '', 
    component: MainContentComponent,
    children: [
      { 
        path: 'alumnos',
        loadChildren: () => import('./alumnos/alumnos.module').then(m => m.AlumnosModule)
      },
      { 
        path: 'cursos',  
        loadChildren: () => import('./cursos/cursos.module').then(m => m.CursosModule)
      }
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
