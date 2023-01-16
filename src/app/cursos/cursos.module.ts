import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared.module';
import { CursosWrapperComponent } from './cursos-wrapper.component';
import { ListaCursosComponent } from './lista-cursos/lista-cursos.component';
import { AbmCursosComponent } from './abm-cursos/abm-cursos.component';
import { DetalleCursosComponent } from './detalle-cursos/detalle-cursos.component';

const routes: Routes = [
  { path: 'cursos', 
    component: CursosWrapperComponent,
    children: [
      { path: 'lista-cursos', component: ListaCursosComponent },
      { path: 'abm-curso/:id', component: AbmCursosComponent },
      { path: 'detalle-curso/:id', component: DetalleCursosComponent },
    ]
  },
  { path: '', pathMatch:'full', redirectTo: '' }
]

@NgModule({
  declarations: [
    CursosWrapperComponent, 
    ListaCursosComponent,
    AbmCursosComponent,
    DetalleCursosComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CursosModule { }
