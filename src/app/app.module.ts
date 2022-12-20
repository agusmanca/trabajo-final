import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToobarComponent } from './toobar/toobar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainContentComponent } from './main-content/main-content.component';
import { ListaAlumnosComponent } from './lista-alumnos/lista-alumnos.component';
import { AbmAlumnosComponent } from './abm-alumnos/abm-alumnos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModulesModule } from './material-modules.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ToobarComponent,
    MainContentComponent,
    SidebarComponent,
    ListaAlumnosComponent,
    AbmAlumnosComponent
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
