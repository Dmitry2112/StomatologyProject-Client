import { CanActivateFn } from '@angular/router';

export const isAdminGuard: CanActivateFn = () => {
    //TODO: реализовать функционал ограничивающий доступ к странице админа

    return true;
};
