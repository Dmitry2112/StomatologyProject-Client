import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from '../../../../../../data/api/api';
import { ITherapyResponseModel } from '../response-models/therapy.response-model.interface';
import { ITherapyRequestModel } from '../request-models/therapy.request-model.interface';

@Injectable()
export class TherapyDataService {
    constructor(
        private _http: HttpClient,
    ) {
    }

    public getTherapies(): Observable<ITherapyResponseModel[]> {
        return this._http.get<ITherapyResponseModel[]>(`${apiUrl}/therapy`);
    }

    public addTherapy(therapy: ITherapyRequestModel): Observable<ITherapyResponseModel> {
        return this._http.post<ITherapyResponseModel>(`${apiUrl}/therapy`, therapy);
    }

    public deleteTherapy(id: number): Observable<ITherapyResponseModel> {
        return this._http.delete<ITherapyResponseModel>(`${apiUrl}/therapy/${id}`);
    }
}
