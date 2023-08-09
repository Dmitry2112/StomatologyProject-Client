import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from '../../../../../../data/api/api';
import { IServiceRequestModel } from '../request-models/service.request-model.interface';
import { IServiceResponseModel } from '../response-models/service.response-model.interface';

@Injectable()
export class ServiceDataService {
    constructor(
        private _http: HttpClient,
    ) {
    }

    public addService(service: IServiceRequestModel): Observable<IServiceResponseModel> {
        return this._http.post<IServiceResponseModel>(`${apiUrl}/services`, service);
    }

    public deleteService(id: number): Observable<IServiceResponseModel> {
        return this._http.delete<IServiceResponseModel>(`${apiUrl}/services/${id}`);
    }
}
