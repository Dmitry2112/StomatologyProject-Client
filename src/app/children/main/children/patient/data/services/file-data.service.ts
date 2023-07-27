import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from '../../../../../../data/api/api';
import { IFileRequestModel } from '../request-models/file.request-model.interface';
import { IFileResponseModel } from '../response-models/file.response-model.interface';

@Injectable()
export class FileDataService {
    constructor(
        private _http: HttpClient,
    ) {
    }

    public addFile(file: IFileRequestModel): Observable<IFileResponseModel> {
        return this._http.post<IFileResponseModel>(`${apiUrl}/files`, file);
    }
}
