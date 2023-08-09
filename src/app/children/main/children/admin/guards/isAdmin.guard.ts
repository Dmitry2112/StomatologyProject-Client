import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../../../auth/data/services/auth.service';
import { inject } from '@angular/core';

export const isAdminGuard: CanActivateFn = () => {
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);

    if (authService.isAdmin()) {
        return true;
    } else {
        const userId: number = Number(localStorage.getItem('userId'));
        router.navigate([`/cabinet/patient/${userId}/home`]);
    }

    return false;
};
