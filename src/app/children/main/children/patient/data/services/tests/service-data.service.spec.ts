import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { ServiceDataService } from '../service-data.service';
import { IServiceResponseModel } from '../../response-models/service.response-model.interface';
import { IServiceRequestModel } from '../../request-models/service.request-model.interface';

describe('ServiceDataService', () => {
    let serviceDataService: ServiceDataService;
    let http: HttpClient;

    const fakeHttp: any = jasmine.createSpyObj('HttpClient', ['delete', 'post']);

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                ServiceDataService,
                { provide: HttpClient, useValue: fakeHttp }
            ]
        });

        serviceDataService = TestBed.inject(ServiceDataService);
        http = TestBed.inject(HttpClient);
    });

    it('должен создаваться', () => {
        expect(serviceDataService).toBeDefined();
    });

    it('addService должен добавлять новую услугу и возвращать её', (done: DoneFn) => {
        fakeHttp.post.and.returnValue(of({} as IServiceResponseModel));
        serviceDataService.addService({} as IServiceRequestModel)
            .subscribe((service: IServiceResponseModel) => {
                expect(service).toEqual({} as IServiceResponseModel);
                done();
            });
    });

    it('deleteService должен удалять услугу и возвращать её', (done: DoneFn) => {
        fakeHttp.delete.and.returnValue(of({} as IServiceResponseModel));
        serviceDataService.deleteService(1)
            .subscribe((service: IServiceResponseModel) => {
                expect(service).toEqual({} as IServiceResponseModel);
                done();
            });
    });
});
