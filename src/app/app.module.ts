import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MainContentComponent } from './main-content/main-content.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ToobarComponent } from './toobar/toobar.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared.module';
import { HttpClientModule } from '@angular/common/http';

import { AlumnosModule } from './alumnos/alumnos.module';
import { CursosModule } from './cursos/cursos.module';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { UsuariosModule } from './usuarios/usuarios.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { ROOT_REDUCER } from './state/app.state';
import { LoginEffects } from './state/login/login.effect';

@NgModule({
  declarations: [
    AppComponent,
    MainContentComponent,
    ToobarComponent,
    SidebarComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    AlumnosModule,
    CursosModule,
    UsuariosModule,
    StoreModule.forRoot(ROOT_REDUCER, {}),
    EffectsModule.forRoot([LoginEffects]),
    StoreDevtoolsModule.instrument({ name:'Test' })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
