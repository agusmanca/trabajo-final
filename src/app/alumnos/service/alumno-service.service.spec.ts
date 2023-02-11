import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AlumnoServiceService } from './alumno-service.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { AlumnoDto } from '../model/alumnoDto';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const mockUserList: Array<AlumnoDto> = [
    {
        id: 1,
        nombre: 'Jim',
        apellido: 'Morrison',
        edad: 15,
        curso: 4,
        division: 'B',
        calificaciones: []
    },
    {
        id: 2,
        nombre: 'Eric',
        apellido: 'Clapton',
        edad: 16,
        curso: 5,
        division: 'C',
        calificaciones: []
    },
    {
        id: 3,
        nombre: 'John',
        apellido: 'Doe',
        edad: 16,
        curso: 5,
        division: 'A',
        calificaciones: []
    }
];

const mockAsignatura: Array<string> = ['Angular','React','Java','Go'];

describe('AlumnoServiceService', () => {

    let service: AlumnoServiceService;
    let httpTestingCtrl: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
        service = TestBed.inject(AlumnoServiceService);
        httpTestingCtrl = TestBed.inject(HttpTestingController);

        httpTestingCtrl.expectOne({
            url: `${environment.mockApiUrl}alumnos`,
            method: 'GET',

        }).flush(mockUserList);
    });

    it('La aplicacion deberia crearce correctamente', () => {
        expect(service).toBeTruthy()
    });

    it('El metodo getAlumnosList() deberia retornar una lista de alumnos', () => {
        service.getAlumnosList().subscribe((alumnos: Array<AlumnoDto>) => {
            expect(alumnos).toEqual(mockUserList);
        })
    });

    it('El metodo getAsignaturasList() deberia retornar una lista de asignaturas igual al mock', () => {
        expect(service.getAsignaturasList()).toEqual(mockAsignatura);
    });

    it('El metodo getAlumnoById() deberia buscar y retornar el mismo alumno del mock', () => {
        const alumno: AlumnoDto = service.getAlumnoById(1);
        const mockAlumno: AlumnoDto = mockUserList.filter(alu => alu.id == 1)[0];

        expect(alumno).toBeTruthy();
        expect(alumno.nombre).toEqual(mockAlumno.nombre);
    });

    it('Deberia obtener una lista actualizada de alumnos al persistir un alumno nuevo', () => {

        const newAlu: AlumnoDto = {
            id: 4,
            nombre: 'Nuevo',
            apellido: 'Alumno',
            edad: 1,
            curso: 1,
            division: 'A',
            calificaciones: []
        }

        const newAlumnoLst: AlumnoDto[] = [...mockUserList, newAlu];
       
        const spyPost = spyOn(TestBed.inject(HttpClient), 'post').and.callThrough();
        const spyGet = spyOn(TestBed.inject(HttpClient), 'get').and.callThrough();

        service.saveNewAlumno(newAlu);

        httpTestingCtrl.expectOne({
            url: `${environment.mockApiUrl}alumnos`,
            method: 'POST'
        }).flush(newAlu);

        httpTestingCtrl.expectOne({
            url: `${environment.mockApiUrl}alumnos`,
            method: 'GET'
        }).flush(newAlumnoLst);

        service.getAlumnosList().subscribe((alumnos: Array<AlumnoDto>) => {
            expect(alumnos).toEqual(newAlumnoLst);
        });

        expect(spyPost).toHaveBeenCalled();  
        expect(spyGet).toHaveBeenCalled();
    });

    it('Deberia obtener una lista actualizada de alumnos al actualizar los datos de un alumno existente', () => {
        const updatedAlu = {
            id: 1,
            nombre: 'Juan',
            apellido: 'Morri',
            edad: 16,
            curso: 5,
            division: 'B',
            calificaciones: []
        }

        let updatedAlumnoLst: AlumnoDto[] = [...mockUserList];
        updatedAlumnoLst[1] = updatedAlu;

        const spyPut = spyOn(TestBed.inject(HttpClient), 'put').and.callThrough();
        const spyGet = spyOn(TestBed.inject(HttpClient), 'get').and.callThrough();

        service.updateAlumno(updatedAlu);

        httpTestingCtrl.expectOne({
            url: `${environment.mockApiUrl}alumnos/${updatedAlu.id}`,
            method: 'PUT'
        }).flush(updatedAlu);

        httpTestingCtrl.expectOne({
            url: `${environment.mockApiUrl}alumnos`,
            method: 'GET'
        }).flush(updatedAlumnoLst);


        service.getAlumnosList().subscribe((alumnos: Array<AlumnoDto>) => {
            expect(alumnos).toEqual(updatedAlumnoLst);
        });

        expect(spyPut).toHaveBeenCalled();  
        expect(spyGet).toHaveBeenCalled();
    });

    it('Deberia obtener una lista actualizada de alumnos al eliminar un alumno existente', () => {
        const aluTopDelId = 3;
        const alumnoLst: AlumnoDto[] = mockUserList.filter(alu => alu.id != aluTopDelId);
        const deletedAlu: AlumnoDto = {
            id: 3,
            nombre: 'John',
            apellido: 'Doe',
            edad: 16,
            curso: 5,
            division: 'A',
            calificaciones: []
        }

        const spyDelete = spyOn(TestBed.inject(HttpClient), 'delete').and.callThrough();
        const spyGet = spyOn(TestBed.inject(HttpClient), 'get').and.callThrough();

        service.deleteAlumno(aluTopDelId);

        httpTestingCtrl.expectOne({
            url: `${environment.mockApiUrl}alumnos/${aluTopDelId}`,
            method: 'DELETE'
        }).flush(deletedAlu);

        httpTestingCtrl.expectOne({
            url: `${environment.mockApiUrl}alumnos`,
            method: 'GET'
        }).flush(alumnoLst);

        expect(spyDelete).toHaveBeenCalled();  
        expect(spyGet).toHaveBeenCalled();
    });
});
