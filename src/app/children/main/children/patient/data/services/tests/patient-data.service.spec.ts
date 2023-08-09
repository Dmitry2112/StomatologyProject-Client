import { PatientDataService } from '../patient-data.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { IPatientResponseModel } from '../../response-models/patient.response-model.interface';
import { of } from 'rxjs';
import { IPatientRequestModel } from '../../request-models/patient.request-model.interface';

describe('PatientDataService', () => {
    let patientDataService: PatientDataService;
    let http: HttpClient;

    const fakeHttp: any = jasmine.createSpyObj('HttpClient', ['get', 'patch']);

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                PatientDataService,
                { provide: HttpClient, useValue: fakeHttp }
            ]
        });

        patientDataService = TestBed.inject(PatientDataService);
        http = TestBed.inject(HttpClient);
    });

    it('должен создаваться', () => {
        expect(patientDataService).toBeDefined();
    });

    it('getPatients должен возвращать массив пациентов', (done: DoneFn) => {
        fakeHttp.get.and.returnValue(of([] as IPatientResponseModel[]));
        patientDataService.getPatients()
            .subscribe((patients: IPatientResponseModel[]) => {
                expect(patients).toEqual([] as IPatientResponseModel[]);
                done();
            });
    });

    it('getPatientData должен возвращать одного пациента', (done: DoneFn) => {
        fakeHttp.get.and.returnValue(of({} as IPatientResponseModel));
        patientDataService.getPatientData(1)
            .subscribe((patient: IPatientResponseModel) => {
                expect(patient).toEqual({} as IPatientResponseModel);
                done();
            });
    });

    it('updatePatient должен обновлять данные и возвращать пациента', (done: DoneFn) => {
        fakeHttp.patch.and.returnValue(of({} as IPatientResponseModel));
        patientDataService.updatePatient(1, {} as IPatientRequestModel)
            .subscribe((patient: IPatientResponseModel) => {
                expect(patient).toEqual({} as IPatientResponseModel);
                done();
            });
    });
});
