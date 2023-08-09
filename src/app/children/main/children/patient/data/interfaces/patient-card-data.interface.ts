import { IPatientCardField } from './patient-card-field.interface';

export interface IPatientCardData {
    photo?: string,
    patientCardFields: IPatientCardField[]
}
