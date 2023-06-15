import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../../data/services/auth.service';
import { IRegisterForm } from '../../data/interfaces/register-form.interface';
import { IAuthUserRegisterRequestModel } from '../../data/request-models/auth-user-register.request-model.interface';
import { passwordValidator } from '../../validators/password.validator';

@Component({
    selector: 'auth-register-page',
    templateUrl: './register.page.web.component.html',
    styleUrls: ['./styles/register.page.web.component.scss']
})
export class RegisterPageWebComponent implements OnDestroy {
    public registerForm!: FormGroup<IRegisterForm>;

    private _registerSubscription!: Subscription;

    constructor(private _auth: AuthService, private _router: Router) {
        this.registerForm = new FormGroup<IRegisterForm>({
            lastName: new FormControl('', {
                nonNullable: true,
                validators: [Validators.required]
            }),
            firstName: new FormControl('', {
                nonNullable: true,
                validators: [Validators.required]
            }),
            patronymic: new FormControl('', {
                nonNullable: true,
                validators: [Validators.required]
            }),
            birthDate: new FormControl('', {
                nonNullable: true,
                validators: [Validators.required]
            }),
            email: new FormControl('', {
                nonNullable: true,
                validators: [Validators.required, Validators.email]
            }),
            password: new FormControl('', {
                nonNullable: true,
                validators: [
                    Validators.required,
                    Validators.minLength(6),
                    passwordValidator
                ]
            }),
            role: new FormControl('', {
                nonNullable: true,
                validators: [Validators.required]
            })
        });
    }

    public ngOnDestroy(): void {
        if (this._registerSubscription) {
            this._registerSubscription.unsubscribe();
        }
    }

    public onSubmit(): void {
        if (this.registerForm.invalid) {
            this.registerForm.markAllAsTouched();

            return;
        }
        let user: IAuthUserRegisterRequestModel;
        const role: string = this.registerForm.controls.role.value;
        if (role === 'ADMIN') {
            user = {
                lastName: this.registerForm.controls.lastName.value,
                firstName: this.registerForm.controls.firstName.value,
                patronymic: this.registerForm.controls.patronymic.value,
                birthDate: this.registerForm.controls.birthDate.value,
                email: this.registerForm.controls.email.value,
                password: this.registerForm.controls.password.value,
                role: this.registerForm.controls.role.value
            };
        } else {
            user = {
                lastName: this.registerForm.controls.lastName.value,
                firstName: this.registerForm.controls.firstName.value,
                patronymic: this.registerForm.controls.patronymic.value,
                birthDate: this.registerForm.controls.birthDate.value,
                email: this.registerForm.controls.email.value,
                password: this.registerForm.controls.password.value,
                role: this.registerForm.controls.role.value,
                therapyList: [],
                photoDocuments: [],
                photo: ''
            };
        }

        this.registerForm.disable();
        this._registerSubscription = this._auth
            .register(user)
            .subscribe(
                () => {
                    alert('Новый пользователь успешно добавлен!');
                    this._router.navigate(['/admin/patient-list']);
                }
            );
    }
}
