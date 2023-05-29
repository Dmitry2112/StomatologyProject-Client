import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPatientResponseModel } from '../response-models/patient.response-model.interface';

@Injectable()
export class PatientDataService {
    constructor(
        private _http: HttpClient,
    ) {
    }

    public getPatientData(id: number): Observable<IPatientResponseModel> {
        return this._http.get<IPatientResponseModel>(`https://restful-api-vercel-lake.vercel.app/users/${id}`);
    }
}
