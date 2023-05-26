import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAdminResponseModel } from '../response-models/admin.response-model.interface';

@Injectable()
export class AdminDataService {
    constructor(
        private _http: HttpClient,
    ) {
    }

    public getAdminData(id: number): Observable<IAdminResponseModel> {
        return this._http.get<IAdminResponseModel>(`http://localhost:3000/users/${id}`);
    }
}
