import { FormControl } from '@angular/forms';

export interface IRegisterForm {
    lastName: FormControl<string>;
    firstName: FormControl<string>;
    patronymic: FormControl<string>;
    birthDate: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
    role: FormControl<string>;
}
