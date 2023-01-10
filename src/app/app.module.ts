import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AbmAlumnosComponent } from './alumnos/abm-alumnos/abm-alumnos.component';
import { DetalleAlumnosComponent } from './alumnos/detalle-alumnos/detalle-alumnos.component';
import { ListaAlumnosComponent } from './alumnos/lista-alumnos/lista-alumnos.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AbmCursosComponent } from './cursos/abm-cursos/abm-cursos.component';
import { DetalleCursosComponent } from './cursos/detalle-cursos/detalle-cursos.component';
import { ListaCursosComponent } from './cursos/lista-cursos/lista-cursos.component';
import { MainContentComponent } from './main-content/main-content.component';
import { MaterialModulesModule } from './material-modules.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ToobarComponent } from './toobar/toobar.component';

@NgModule({
  declarations: [
    AppComponent,
    ToobarComponent,
    MainContentComponent,
    SidebarComponent,
    AbmAlumnosComponent,
    ListaAlumnosComponent,
    DetalleAlumnosComponent,
    ListaCursosComponent, 
    AbmCursosComponent,
    DetalleCursosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModulesModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
