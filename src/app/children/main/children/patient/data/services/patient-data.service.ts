import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPatientResponseModel } from '../response-models/patient.response-model.interface';
import { apiUrl } from '../../../../../../data/api/api';
import { IUpdatePatientRequestModel } from '../request-models/update-patient.request-model.interface';

@Injectable()
export class PatientDataService {
    constructor(
        private _http: HttpClient,
    ) {
    }

    public getPatientData(id: number): Observable<IPatientResponseModel> {
        return this._http.get<IPatientResponseModel>(`${apiUrl}/users/${id}`);
    }

    public getPatients(): Observable<IPatientResponseModel[]> {
        return this._http.get<IPatientResponseModel[]>(`${apiUrl}/users`);
    }

    public updatePatient(id: number, updatePatient: IUpdatePatientRequestModel): Observable<IPatientResponseModel> {
        return this._http.patch<IPatientResponseModel>(`${apiUrl}/users/${id}`, updatePatient);
    }
}
