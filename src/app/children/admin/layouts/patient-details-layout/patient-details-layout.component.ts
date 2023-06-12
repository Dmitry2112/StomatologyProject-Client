import { Component, Inject, OnInit } from '@angular/core';
import { OPEN_NAVIGATION_TOKEN } from '../../../main/data/tokens/open-navigation.token';
import { BehaviorSubject } from 'rxjs';
import { INavigationData } from '../../data/interfaces/navigation-data.interface';
import { ActivatedRoute, Params } from '@angular/router';

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
        const patientId: string = window.location.pathname.split('/')[3];
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
            }
        ];
    }
}
