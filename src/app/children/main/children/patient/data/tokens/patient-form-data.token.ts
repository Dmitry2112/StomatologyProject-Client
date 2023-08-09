import { InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IPatientFormData } from '../interfaces/patient-form-data.interface';

export const PATIENT_FORM_DATA_TOKEN: InjectionToken<BehaviorSubject<IPatientFormData | null>> =
    new InjectionToken<BehaviorSubject<IPatientFormData | null>>( 'the token that is used to set patient data in the form');
