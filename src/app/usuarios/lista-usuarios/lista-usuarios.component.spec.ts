import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthGuard } from 'src/app/commons/auth.guard';
import { UsuariosService } from '../servicios/usuarios.service';

import { ListaUsuariosComponent } from './lista-usuarios.component';

describe('ListaUsuariosComponent', () => {
  let component: ListaUsuariosComponent;
  let fixture: ComponentFixture<ListaUsuariosComponent>;

  let router: Router;
  let spyDeleteUser: jasmine.Spy;
  let spyUserListUser: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaUsuariosComponent ],
      providers:[RouterTestingModule] 
    })
    .compileComponents();
 
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(ListaUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deberia crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Deberia setear campo usuarios', () => {
    expect(component.usuarios).toBeTruthy();
  });

  it('Deberia ejecutar el metodo navigate al llamar crearUsuario', () => {
      const navigateSpy = spyOn(router, 'navigate');

      component.crearUsuario();
      expect(navigateSpy).toHaveBeenCalledWith(['usuarios','abm-usuarios', 0]);
  });

  it('Deberia ejecutar el metodo navigate al llamar actualizarUsuario', () => {
      const navigateSpy = spyOn(router, 'navigate');

      component.actualizarUsuario(5);
      expect(navigateSpy).toHaveBeenCalledWith(['usuarios','abm-usuarios', 5]);
  });

  it('Deberia llamar los metodos deleteUser Y getUserList del servicio usuarios al llamar al metodo eliminar usuario', () => {
    spyDeleteUser = spyOn(TestBed.inject(UsuariosService), 'deleteUsuario').and.callThrough();
    spyUserListUser = spyOn(TestBed.inject(UsuariosService), 'getUserList').and.callThrough();
    component.eliminarUsuario(5);
    expect(spyDeleteUser).toHaveBeenCalled();  
    expect(spyUserListUser).toHaveBeenCalled();  
  });

  it('Deberia retornar verdadero al llamar al metodo isAuth', () => {
      spyOn(TestBed.inject(AuthGuard), 'getRole').and.returnValue('0');
      expect(component.isAuth()).toBeTrue();
  });

  it('Deberia retornar verdadero al llamar al metodo isAuth', () => {
      spyOn(TestBed.inject(AuthGuard), 'getRole').and.returnValue('1');
      expect(component.isAuth()).toBeFalse();
  });
});
