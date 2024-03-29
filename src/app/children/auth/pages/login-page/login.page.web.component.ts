import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AuthService } from '../../data/services/auth.service';
import { ILoginForm } from '../../data/interfaces/login-form.interface';
import { passwordValidator } from '../../validators/password.validator';
import { IAuthUserResponseModel } from '../../data/response-models/auth-user.response-model.interface';
import { IAuthUserLoginRequestModel } from '../../data/request-models/auth-user-login.request-model.interface';


@Component({
    selector: 'auth-login-page',
    templateUrl: './login.page.web.component.html',
    styleUrls: ['./styles/login.page.web.component.scss']
})
export class LoginPageWebComponent implements OnInit, OnDestroy {
    public loginForm!: FormGroup<ILoginForm>;

    private _loginSubscription!: Subscription;

    constructor(
        private _auth: AuthService,
        private _router: Router,
        private _route: ActivatedRoute
    ) {
        this.loginForm = new FormGroup<ILoginForm>({
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
            })
        });
    }

    //TODO есть идея сделать что-то типо уведомлений для пользователя
    public ngOnInit(): void {
        this._route.queryParams.subscribe((params: Params) => {
            if (params['registered']) {
                // Теперь вы можете войти в систему используя свои данные
            } else if (params['accessDenied']) {
                // Для начала авторизуйтесь в системе
            }
        });
    }

    public ngOnDestroy(): void {
        if (this._loginSubscription) {
            this._loginSubscription.unsubscribe();
        }
    }

    public onSubmit(): void {
        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();

            return;
        }
        const user: IAuthUserLoginRequestModel = {
            email: this.loginForm.controls.email.value,
            password: this.loginForm.controls.password.value
        };
        this.loginForm.disable();
        this._loginSubscription = this._auth
            .login(user)
            .subscribe(
                (data: IAuthUserResponseModel) => {
                    if (data.user.role === 'ADMIN') {
                        this._router.navigate(['cabinet/admin']);
                    } else {
                        this._router.navigate([`/cabinet/patient/${data.user.id}/home`]);
                    }
                }
            );
    }
}
