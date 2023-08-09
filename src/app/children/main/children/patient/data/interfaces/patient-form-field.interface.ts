import { FormControl } from '@angular/forms';

export interface IPatientFormField {
    label: string;
    control: FormControl;
    controlType: string;
}
