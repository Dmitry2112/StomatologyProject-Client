import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { TherapyDataService } from '../therapy-data.service';
import { ITherapyResponseModel } from '../../response-models/therapy.response-model.interface';
import { ITherapyRequestModel } from '../../request-models/therapy.request-model.interface';

describe('TherapyDataService', () => {
    let therapyDataService: TherapyDataService;
    let http: HttpClient;

    const fakeHttp: any = jasmine.createSpyObj('HttpClient', ['get', 'post', 'delete']);

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                TherapyDataService,
                { provide: HttpClient, useValue: fakeHttp }
            ]
        });

        therapyDataService = TestBed.inject(TherapyDataService);
        http = TestBed.inject(HttpClient);
    });

    it('должен создаваться', () => {
        expect(therapyDataService).toBeDefined();
    });

    it('getTherapies должен возвращать массив лечений', (done: DoneFn) => {
        fakeHttp.get.and.returnValue(of([] as ITherapyResponseModel[]));
        therapyDataService.getTherapies()
            .subscribe((therapy: ITherapyResponseModel[]) => {
                expect(therapy).toEqual([] as ITherapyResponseModel[]);
                done();
            });
    });

    it('addTherapy должен добавлять новое лечение и возвращать его', (done: DoneFn) => {
        fakeHttp.post.and.returnValue(of({} as ITherapyResponseModel));
        therapyDataService.addTherapy({} as ITherapyRequestModel)
            .subscribe((patient: ITherapyResponseModel) => {
                expect(patient).toEqual({} as ITherapyResponseModel);
                done();
            });
    });

    it('deleteTherapy должен удалять лечение и возвращать его', (done: DoneFn) => {
        fakeHttp.delete.and.returnValue(of({} as ITherapyResponseModel));
        therapyDataService.deleteTherapy(1)
            .subscribe((patient: ITherapyResponseModel) => {
                expect(patient).toEqual({} as ITherapyResponseModel);
                done();
            });
    });
});
