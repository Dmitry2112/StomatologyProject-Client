import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from '../../../../../../data/api/api';
import { IAppointmentRequestModel } from '../request-models/appointment.request-model.interface';
import { IAppointmentResponseModel } from '../response-models/appointment.response-model.interface';
import { IUpdateAppointmentRequestModel } from '../request-models/update-appointment.request-model.interface';

@Injectable()
export class AppointmentDataService {
    constructor(
        private _http: HttpClient,
    ) {
    }

    public addAppointment(appointment: IAppointmentRequestModel): Observable<IAppointmentResponseModel> {
        return this._http.post<IAppointmentResponseModel>(`${apiUrl}/appointment`, appointment);
    }

    public deleteAppointment(id: number): Observable<IAppointmentResponseModel> {
        return this._http.delete<IAppointmentResponseModel>(`${apiUrl}/appointment/${id}`);
    }

    public updateAppointment(id: number, updateAppointment: IUpdateAppointmentRequestModel): Observable<IAppointmentResponseModel> {
        return this._http.patch<IAppointmentResponseModel>(`${apiUrl}/appointment/${id}`, updateAppointment);
    }
}
