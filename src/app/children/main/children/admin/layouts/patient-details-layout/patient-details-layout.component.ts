import { Component, Inject, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { INavigationData } from '../../data/interfaces/navigation-data.interface';
import { OPEN_NAVIGATION_TOKEN } from '../../../../data/tokens/open-navigation.token';

@Component({
    selector: 'patient-details-layout',
    templateUrl: './patient-details-layout.component.html',
    styleUrls: ['./styles/patient-details-layout.component.scss']
})
export class PatientDetailsLayoutComponent implements OnInit {
    public navigationData: INavigationData[] = [];

    constructor(@Inject(OPEN_NAVIGATION_TOKEN) public openNavigation$: BehaviorSubject<boolean>) {
    }

    public ngOnInit(): void {
        const patientId: string = window.location.pathname.split('/')[4];
        this.navigationData = [
            {
                link: `${patientId}/home`,
                imgSrc: 'home.svg',
                title: 'Профиль'
            },
            {
                link: `${patientId}/plan`,
                imgSrc: 'planning.svg',
                title: 'План лечения'
            },
            {
                link: `${patientId}/photodocs`,
                imgSrc: 'gallery.svg',
                title: 'Фотодокументы'
            },
            {
                link: `../patient-list`,
                imgSrc: 'backspace-arrow.svg',
                title: 'Вернуться к списку пациентов'
            }
        ];
    }
}
