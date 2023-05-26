import { Component, Inject, OnInit } from '@angular/core';
import { OPEN_NAVIGATION_TOKEN } from '../../data/tokens/open-navigation.token';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'main-layout',
    templateUrl: './main-layout.component.html',
    styleUrls: ['./styles/main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
    public userId!: string | null;

    constructor(@Inject(OPEN_NAVIGATION_TOKEN) public openNavigation$: BehaviorSubject<boolean>) {
    }

    public ngOnInit(): void {
        this.userId = localStorage.getItem('userId');
    }
}
