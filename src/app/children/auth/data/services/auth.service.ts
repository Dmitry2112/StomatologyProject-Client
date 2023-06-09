import { Injectable } from '@angular/core';
import { IAuthUserRequestModel } from '../request-models/auth-user.request-model.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IAuthUserResponseModel } from '../response-models/auth-user.response-model.interface';
import { apiUrl } from '../../../../data/api/api';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _token: string | undefined = undefined;

    constructor(private _http: HttpClient) {
    }

    public register(user: IAuthUserRequestModel): Observable<IAuthUserResponseModel> {
        return this._http.post<IAuthUserResponseModel>(`${apiUrl}/register`, user)
            .pipe(
                tap((response: IAuthUserResponseModel) => {
                    this.setToken(response.accessToken);
                    this.setUserId(response.user.id);
                })
            );
    }

    public login(user: IAuthUserRequestModel): Observable<IAuthUserResponseModel> {
        return this._http.post<IAuthUserResponseModel>(`${apiUrl}/login`, user)
            .pipe(
                tap((response: IAuthUserResponseModel) => {
                    this.setToken(response.accessToken);
                    this.setUserId(response.user.id);
                })
            );
    }

    //TODO: В burger-button сделать кнопку "выйти", она будет использовать эту функцию
    public logout(): void {
        this.removeToken();
    }

    public isAuthenticated(): boolean {
        return !!this._token || !!localStorage.getItem('token');
    }

    //TODO: использовать, чтобы передавать токен в запросах
    public getToken(): string | undefined {
        return this._token;
    }

    private setToken(token: string): void {
        localStorage.setItem('token', token);
        this._token = token;
    }

    private setUserId(userId: number): void {
        localStorage.setItem('userId', userId.toString());
    }

    private removeToken(): void {
        localStorage.removeItem('token');
        this._token = undefined;
    }
}
