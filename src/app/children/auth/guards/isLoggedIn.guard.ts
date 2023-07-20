import { inject } from '@angular/core';
import { CanActivateFn, Router, } from '@angular/router';
import { AuthService } from '../data/services/auth.service';


export const isLoggedInGuard: CanActivateFn = () => {
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);

    if (authService.isAuthenticated()) {
        if (authService.isAdmin()) {
            return true;
        } else {
            const userId: number = Number(localStorage.getItem('userId'));
            router.navigate([`/cabinet/patient/${userId}/home`]);
        }
    }

    return !authService.isAuthenticated();
};
