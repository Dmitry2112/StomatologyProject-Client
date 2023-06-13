import { IPatientFormField } from './patient-form-field.interface';

export interface IPatientFormData {
    patientFormFields: IPatientFormField[];
    photo?: string;
}
