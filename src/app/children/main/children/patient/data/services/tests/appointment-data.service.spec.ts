import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { AppointmentDataService } from '../appointment-data.service';
import { IAppointmentResponseModel } from '../../response-models/appointment.response-model.interface';
import { IAppointmentRequestModel } from '../../request-models/appointment.request-model.interface';

describe('AppointmentDataService', () => {
    let appointmentDataService: AppointmentDataService;
    let http: HttpClient;

    const fakeHttp: any = jasmine.createSpyObj('HttpClient', ['patch', 'post', 'delete']);

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                AppointmentDataService,
                { provide: HttpClient, useValue: fakeHttp }
            ]
        });

        appointmentDataService = TestBed.inject(AppointmentDataService);
        http = TestBed.inject(HttpClient);
    });

    it('должен создаваться', () => {
        expect(appointmentDataService).toBeDefined();
    });

    it('addAppointment должен добавлять новый прием и возвращать его', (done: DoneFn) => {
        fakeHttp.post.and.returnValue(of({} as IAppointmentResponseModel));
        appointmentDataService.addAppointment({} as IAppointmentRequestModel)
            .subscribe((appointment: IAppointmentResponseModel) => {
                expect(appointment).toEqual({} as IAppointmentResponseModel);
                done();
            });
    });

    it('deleteAppointment должен удалять лечение и возвращать его', (done: DoneFn) => {
        fakeHttp.delete.and.returnValue(of({} as IAppointmentResponseModel));
        appointmentDataService.deleteAppointment(1)
            .subscribe((appointment: IAppointmentResponseModel) => {
                expect(appointment).toEqual({} as IAppointmentResponseModel);
                done();
            });
    });

    it('updateAppointment должен удалять лечение и возвращать его', (done: DoneFn) => {
        fakeHttp.patch.and.returnValue(of({} as IAppointmentResponseModel));
        appointmentDataService.updateAppointment(1, {} as IAppointmentRequestModel)
            .subscribe((appointment: IAppointmentResponseModel) => {
                expect(appointment).toEqual({} as IAppointmentResponseModel);
                done();
            });
    });
});
