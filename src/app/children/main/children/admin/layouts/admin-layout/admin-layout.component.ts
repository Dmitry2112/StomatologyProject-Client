import { Component, Inject, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { INavigationData } from '../../data/interfaces/navigation-data.interface';
import { OPEN_NAVIGATION_TOKEN } from '../../../../data/tokens/open-navigation.token';

@Component({
    selector: 'admin-layout',
    templateUrl: './admin-layout.component.html',
    styleUrls: ['./styles/admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
    public navigationData: INavigationData[] = [];

    constructor(@Inject(OPEN_NAVIGATION_TOKEN) public openNavigation$: BehaviorSubject<boolean>) {
    }

    public ngOnInit(): void {
        this.navigationData = [
            {
                link: 'home',
                imgSrc: 'home.svg',
                title: 'Главная'
            },
            {
                link: 'patient-list',
                imgSrc: 'patient-list-icon.svg',
                title: 'Список пациентов'
            },
            {
                link: '/auth/register',
                imgSrc: 'add-client.svg',
                title: 'Добавить клиента'
            }
        ];
    }
}
