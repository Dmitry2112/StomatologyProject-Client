import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { FileDataService } from '../file-data.service';
import { IFileResponseModel } from '../../response-models/file.response-model.interface';
import { IFileRequestModel } from '../../request-models/file.request-model.interface';

describe('FileDataService', () => {
    let fileDataService: FileDataService;
    let http: HttpClient;

    const fakeHttp: any = jasmine.createSpyObj('HttpClient', ['get', 'post']);

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                FileDataService,
                { provide: HttpClient, useValue: fakeHttp }
            ]
        });

        fileDataService = TestBed.inject(FileDataService);
        http = TestBed.inject(HttpClient);
    });

    it('должен создаваться', () => {
        expect(fileDataService).toBeDefined();
    });

    it('getPatientFiles должен возвращать массив файлов для определенного пациента', (done: DoneFn) => {
        fakeHttp.get.and.returnValue(of([] as IFileResponseModel[]));
        fileDataService.getPatientFiles(1)
            .subscribe((files: IFileResponseModel[]) => {
                expect(files).toEqual([] as IFileResponseModel[]);
                done();
            });
    });

    it('addFile должен добавлять новый файл и возвращать его', (done: DoneFn) => {
        fakeHttp.post.and.returnValue(of({} as IFileResponseModel));
        fileDataService.addFile({} as IFileRequestModel)
            .subscribe((file: IFileResponseModel) => {
                expect(file).toEqual({} as IFileResponseModel);
                done();
            });
    });
});
