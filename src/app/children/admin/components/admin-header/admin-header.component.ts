import { Component, Inject, Input, OnInit } from '@angular/core';
import { PatientDataService } from '../../../main/data/services/patient-data.service';
import { OPEN_NAVIGATION_TOKEN } from '../../../main/data/tokens/open-navigation.token';
import { BehaviorSubject } from 'rxjs';
import { IPatientResponseModel } from '../../../main/data/response-models/patient.response-model.interface';

@Component({
    selector: 'admin-header',
    templateUrl: './admin-header.component.html',
    styleUrls: ['./styles/admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {
    @Input()
    public userInfo!: string;

    constructor(
        private _patientDataService: PatientDataService,
        @Inject(OPEN_NAVIGATION_TOKEN) public openNavigation$: BehaviorSubject<boolean>
    ) {
    }

    public ngOnInit(): void {
        this._patientDataService.getPatientData(Number(localStorage.getItem('userId')))
            .subscribe((data: IPatientResponseModel) => {
                this.userInfo = `${data.firstName} ${data.lastName}`;
            });
    }

    public openNavigation(): void {
        this.openNavigation$.next(!this.openNavigation$.getValue());
    }
}
