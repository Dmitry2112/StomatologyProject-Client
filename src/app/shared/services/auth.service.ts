import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private token: string | null = null;

    constructor(private http: HttpClient) {}

    register(user: User): Observable<User> {
    // return this.http.post<User>('/api/auth/register', user)
        return this.http.post<User>('http://localhost:3000/register', user);
    }

    login(user: User): Observable<{ accessToken: string }> {
    // return this.http.post<{ token: string }>('/api/auth/login', user)
        return this.http.post<{ accessToken: string }>('http://localhost:3000/login', user)
            .pipe(
                tap(({ accessToken }) => {
                    localStorage.setItem('token', accessToken);
                    this.setToken(accessToken);
                })
            );
    }

    setToken(token: string | null) {
        this.token = token;
    }

    getToken(): string | null {
        return this.token;
    }

    isAuthenticated(): boolean {
        return !!this.token;
    }

    logout() {
        this.setToken(null);
        localStorage.clear();
    }
}
