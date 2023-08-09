import { Component, Inject, Input, OnInit } from '@angular/core';
import { OPEN_NAVIGATION_TOKEN } from '../../data/tokens/open-navigation.token';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'navigation-button',
    templateUrl: './navigation-button.component.html',
    styleUrls: ['./styles/navigation-button.component.scss']
})
export class NavigationButtonComponent implements OnInit {
    @Input()
    public pageRout!: string;

    @Input()
    public id!: string | null;

    @Input()
    public name!: string;

    @Input()
    public iconSrc!: string;

    public routLink!: string;

    constructor(@Inject(OPEN_NAVIGATION_TOKEN) public openNavigation$: BehaviorSubject<boolean>) {
    }

    public ngOnInit(): void {
        this.routLink = `${this.id}/${this.pageRout}`;
    }

    public closeNavigation(): void {
        this.openNavigation$.next(false);
    }
}
