import { Component, Inject, Input } from '@angular/core';
import { INavigationData } from '../../data/interfaces/navigation-data.interface';
import { OPEN_NAVIGATION_TOKEN } from '../../../../data/tokens/open-navigation.token';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'admin-navigation',
    templateUrl: './admin-navigation.component.html',
    styleUrls: ['./styles/admin-navigation.component.scss']
})
export class AdminNavigationComponent {
    @Input()
    public navigationData: INavigationData[] = [];

    constructor(@Inject(OPEN_NAVIGATION_TOKEN) public openNavigation$: BehaviorSubject<boolean>) {
    }

    public closeNavigation(): void {
        this.openNavigation$.next(false);
    }
}
