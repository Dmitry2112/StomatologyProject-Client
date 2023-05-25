import { InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export const OPEN_NAVIGATION_TOKEN: InjectionToken<BehaviorSubject<boolean>> =
    new InjectionToken<BehaviorSubject<boolean>>('used to transmit the navigation status');
