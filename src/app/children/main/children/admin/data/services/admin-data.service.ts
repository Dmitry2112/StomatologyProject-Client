import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAdminResponseModel } from '../response-models/admin.response-model.interface';
import { apiUrl } from '../../../../../../data/api/api';

@Injectable()
export class AdminDataService {
    constructor(
        private _http: HttpClient,
    ) {
    }

    public getAdminData(id: number): Observable<IAdminResponseModel> {
        return this._http.get<IAdminResponseModel>(`${apiUrl}/users/${id}`);
    }
}
