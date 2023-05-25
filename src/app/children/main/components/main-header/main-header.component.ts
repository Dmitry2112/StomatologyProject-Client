import { Component, Inject, Input, OnInit } from '@angular/core';
import { PatientDataService } from '../../data/services/patient-data.service';
import { IPatientResponseModel } from '../../data/response-models/patient.response-model.interface';
import { OPEN_NAVIGATION_TOKEN } from '../../data/tokens/open-navigation.token';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'main-header',
    templateUrl: './main-header.component.html',
    styleUrls: ['./styles/main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {
    @Input()
    public userInfo!: string;

    constructor(
        private _patientDataService: PatientDataService,
        @Inject(OPEN_NAVIGATION_TOKEN) public openNavigation$: BehaviorSubject<boolean>
    ) {
    }

    public ngOnInit(): void {
        this._patientDataService.getPatientData(4)
            .subscribe((data: IPatientResponseModel) => {
                this.userInfo = `${data.firstName} ${data.lastName}`;
            });
    }

    public openNavigation(): void {
        this.openNavigation$.next(!this.openNavigation$.getValue());
    }
}
