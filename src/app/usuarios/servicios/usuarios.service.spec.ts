import { TestBed } from '@angular/core/testing';
import { UserRoleEnum } from 'src/app/commons/userRoleEnum';
import { UsuarioDto } from '../model/usuarioDto';

import { UsuariosService } from './usuarios.service';

describe('UsuariosService', () => {
  let service: UsuariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuariosService);
  });

  it('Deberia crear el componente y setear el valor de usuarios', () => {
    expect(service).toBeTruthy();
    expect(service.usuarios).toBeTruthy();
  });

  it('Deberian existir 4 elementos en usuarios al llamar el metodo getUsuariosMock', () => {
    service.getUsuariosMock();
    expect(service.usuarios.length).toBe(4);
  });

  it('Deberian existir 4 elementos en usuarios al llamar el metodo getUsuariosMock', () => {
    service.getUsuariosMock();
    expect(service.usuarios.length).toBe(4);
  });
  
  it('Deberia retornar la lista de usuario', () => {
      expect(service.getUserList()).toBe(service.usuarios);
  });

  it('Deberia retornar el usuario con user name admin', () => {
    let user = service.getUsuarioByName('admin');
    expect(user).toBeTruthy();
    expect(user?.id).toBe(1);
  });

  it('Deberia retornar el usuario con user name admin', () => {
    let user = service.getUsuarioById(2);
    expect(user).toBeTruthy();
    expect(user?.username).toBe('admin2');
  });

  it('Deberia crear nuevo usuario', () => {
    let listCount: number = service.usuarios.length;

    let userTest: UsuarioDto = {id: 120, nombre: 'test', apellido: 'test', username: 'adminTest', pass: 'adminTest', role: UserRoleEnum.ADMIN };
    service.crearUsuario(userTest);

    let findNewUser = service.getUsuarioByName('adminTest');

    expect(findNewUser).toBeTruthy();
    expect(service.usuarios.length).toBe(listCount + 1);
  });


  it('Deberia actualizar apellido de usuario', () => {
    let userTest: UsuarioDto = {id: 120, nombre: 'test', apellido: 'test', username: 'adminTest', pass: 'adminTest', role: UserRoleEnum.ADMIN };
    service.crearUsuario(userTest);

    userTest.apellido = 'testing';
    service.updateUsuario(userTest);

    let findNewUser = service.getUsuarioByName('adminTest');

    expect(findNewUser?.apellido).toBe('testing');
  });

  it('Deberia eliminar usuario pasado por parametro', () => {
    let userTest: UsuarioDto = {id: 120, nombre: 'test', apellido: 'test', username: 'adminTest', pass: 'adminTest', role: UserRoleEnum.ADMIN };
    
    service.crearUsuario(userTest);

    expect(service.getUsuarioById(120)).toBeTruthy();

    service.deleteUsuario(120);

    expect(service.getUsuarioById(120)).toBeFalsy();
  });
});
