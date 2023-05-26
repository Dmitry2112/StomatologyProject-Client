import { Component, Inject } from '@angular/core';
import { OPEN_NAVIGATION_TOKEN } from '../../../main/data/tokens/open-navigation.token';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'admin-layout',
    templateUrl: './admin-layout.component.html',
    styleUrls: ['./styles/admin-layout.component.scss']
})
export class AdminLayoutComponent {
    constructor(@Inject(OPEN_NAVIGATION_TOKEN) public openNavigation$: BehaviorSubject<boolean>) {
    }
}
