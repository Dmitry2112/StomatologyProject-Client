import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class PatientDataService {
    constructor(
        private _http: HttpClient,
    ) {
    }

    public getPatientData(id: number): Observable<any> {
        return this._http.get<any>(`http://localhost:3000/users/${id}`);
    }
}
